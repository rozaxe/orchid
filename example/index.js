import 'typeface-inter'
import { h, render } from 'preact'
import { useState, useCallback, useRef } from 'preact/hooks'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-gist.css'
import { renderToString } from 'preact-render-to-string'
import htm from 'htm'

import '@fortawesome/fontawesome-free/css/all.css'

hljs.registerLanguage('html', xml);

const html = htm.bind(h)

const THEMES = [
    { raw: 'or-theme--light', display: 'Light' },
    { raw: 'or-theme--light-gray', display: 'Gray' },
    { raw: 'or-theme--dark-gray', display: 'Dark gray' },
    { raw: 'or-theme--dark', display: 'Dark' },
]

function Select({ options, onChange, value, icon = null, ...props }) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef()

    const handleChange = (value) => {
        setIsOpen(false)
        selectRef.current.blur()
        onChange(value)
    }

    const display = (options.find(option => option.raw === value) || {}).display
    return html`
        <div class="or-select ${props.class}" ref=${selectRef} tabIndex="0" onBlur=${() => setIsOpen(false)} onClick=${() => setIsOpen(open => !open)}>
            ${icon && html`
                <div class="or-select__info">
                    <i class="fas ${icon}" />
                </div>
            `}
            <div class="or-select__input">
                ${display}
            </div>
            <div class="or-select__info">
                <i class="fas fa-chevron-down" />
            </div>
            ${isOpen && html`
                <div class="or-select__options">
                    ${options.map(option => html`<div class="or-select__option" onClick=${(e) => { e.stopPropagation(); handleChange(option.raw)}}>${option.display}</div>`)}
                </div>
            `}
        </div>
    `
}

function Title({ children }) {
    const anchor = renderToString(html`${children}`).toLowerCase()
    return html`
        <a class="relative font-bold text-2xl mb-3" href="#/${anchor}" id="/${anchor}">
            <li class="fas fa-hashtag text-ui-primary-rest mr-4" />
            ${children}
        </a>
    `
}

function Card({ children, title }) {
    const [theme, setTheme] = useState('or-theme--light')

    const handleSelectTheme = (value) => {
        setTheme(value)
    }

    const code = renderToString(html`${children}`, {}, { pretty: true })

    const codeRef = useCallback(node => {
        if (node == null) return
        node.innerText = code
        hljs.highlightBlock(node)
    },[]);

    return html`
        <div class="or-column mb-8">
            <${Title}>${title}<//>
            <${Select} class="m-0" icon="fa-palette" value=${theme} onChange=${handleSelectTheme} options=${THEMES} />
            <div class="or-column--padded bg-ui-rest rounded-b">
                <div class="m-1 rounded or-column--padded or-section ${theme}">
                    ${children}
                </div>
                <pre>
                    <code class="m-1 rounded html" style="background-color: #f6f8fa" ref=${codeRef}>
                    </code>
                </pre>
            </div>
        </div>
    `
}

function App() {
    const [theme, setTheme] = useState('or-theme--light-gray')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSelectTheme = (value) => {
        setTheme(value)
    }

    const handleToggleModel = () => {
        if (isModalOpen) {
            document.body.classList.remove('overflow-hidden')
            setIsModalOpen(false)
        } else {
            document.body.classList.add('overflow-hidden')
            setIsModalOpen(true)
        }
    }

    return html`
        <div class="or-app--padded ${theme} ${isModalOpen ? 'overflow-hidden' : ''}">
            <div class="or-toolbar -m-1 mb-2">
                <div class="mx-4" style="height: 32px">
                    <${Orchid} />
                </div>
                <div class="font-bold text-3xl">Orchid</div>
                <div class="flex-1" />
                <${Select} class="theme-selection" icon="fa-palette" value=${theme} onChange=${handleSelectTheme} options=${THEMES} />
            </div>
            <div class="or-app__content">
                <${Card} title="Button">
                    <button class="or-button">Lorem ipsum</button>
                    <button class="or-button--primary">Lorem ipsum</button>
                    <button class="or-button--primary-outline">Lorem ipsum</button>
                    <button class="or-button--ghost">Lorem ipsum</button>
                    <button class="or-button--primary-ghost">Lorem ipsum</button>
                    <button class="or-button-sm">Lorem ipsum</button>
                    <button class="or-button-sm--primary">Lorem ipsum</button>
                    <button class="or-button--primary" disabled>Lorem ipsum</button>
                    <button class="or-button--primary-outline" disabled><i class="fas fa-coffee mr-2" /> Lorem ipsum</button>
                <//>

                <${Card} title="Dialog">
                    <button onClick=${handleToggleModel} class="or-button">Open dialog</button>
                    ${isModalOpen && html`
                        <div class="or-overlay--backdrop">
                            <div class="or-dialog--padded w-6/12g mb-2 mt-8 mx-auto">
                                <div class="or-dialog__header">
                                    Dialog title
                                </div>
                                <div class="or-dialog__content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pharetra, ante sit amet luctus fermentum, nulla sem pulvinar erat, non commodo orci leo quis tellus. Suspendisse suscipit sodales massa eu auctor. Suspendisse lacinia lacinia tellus vel congue. Nullam nec ligula vitae erat laoreet efficitur. Quisque dapibus tellus non odio tempor laoreet. Maecenas dignissim lacus tempor, lobortis tellus vel, sagittis sem. Duis rutrum, nunc et eleifend blandit, lacus sem posuere est, vitae mollis ipsum nisl pulvinar augue. Pellentesque venenatis libero at cursus laoreet. In vestibulum enim magna. Phasellus interdum ac neque ac feugiat. Pellentesque justo tellus, porttitor et massa vel, tristique laoreet libero. Suspendisse venenatis metus et velit dapibus ultricies. Cras vulputate ligula vel lacus dictum cursus. Morbi rhoncus purus eu ligula sagittis euismod. Suspendisse venenatis mi quis sapien vulputate efficitur. Vestibulum nec consectetur eros. 
                                </div>
                                <div class="or-dialog__content">
                                    Donec suscipit ante non sem placerat, iaculis malesuada mauris lacinia. Praesent nulla nisi, laoreet a faucibus cursus, suscipit sed lacus. Aenean eget malesuada nisl. Nunc tincidunt sodales dapibus. Mauris consequat ligula eu vehicula finibus. Maecenas eleifend dapibus condimentum. Sed molestie ultricies ligula, quis sagittis leo facilisis eu. Duis ultricies, felis a pretium fringilla, neque augue auctor arcu, sit amet gravida ex sapien id nibh. Aenean suscipit est enim, et tempus sem ullamcorper et. Fusce nulla lorem, fermentum non lacinia eu, pretium in ipsum. Sed fringilla non ipsum vel eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                </div>
                                &nbsp;
                                <div class="flex flex-row-reverse">
                                    <button class="or-button--primary" onClick=${handleToggleModel}>Close</button>
                                    <button class="or-button--primary-ghost">Lorem ipsum</button>
                                </div>
                            </div>
                        </div>
                    `}
                <//>

                <${Card} title="Divider">
                    <div class="or-text">Lorem ipsum</div>
                    <div class="or-divider" />
                    <div class="flex flex-row">
                        <div class="or-text">Lorem ipsum</div>
                        <div class="or-divider" />
                        <div class="or-text">Lorem ipsum</div>
                    </div>
                <//>

                <${Card} title="Group">
                    <div class="or-group">
                        <input value="Lorem ipsum" class="or-input" />
                        <div class="or-input">
                            <div class="or-input__info">€</div>
                            <input placeholder="42" class="or-input__input" />
                            <div class="or-input__info">
                                <i class="fas fa-coffee mr-2" />
                            </div>
                        </div>
                    </div>
                <//>

                <${Card} title="Input">
                    <input value="Lorem ipsum" class="or-input" />
                    <div class="or-input">
                        <div class="or-input__info">€</div>
                        <input placeholder="42" class="or-input__input" />
                        <div class="or-input__info">.0</div>
                    </div>
                <//>

                <${Card} title="Menu">
                    <div class="or-menu">
                        <div class="or-menu__item">Item 1</div>
                        <div class="or-menu__item">Item 2</div>
                        <div class="or-menu__item">Item 3</div>
                        <div class="or-menu__divider" />
                        <div class="or-menu__item">Item 1</div>
                    </div>
                <//>

                <${Card} title="Section">
                    <div class="or-section">
                        Background color change
                    </div>
                <//>

                <${Card} title="Text">
                    <div class="or-text">
                        Hello !
                    </div>
                <//>

                <${Card} title="Toast">
                    <div class="or-toast">
                        <div class="or-toast__title">Message title</div>
                        <div class="or-toast__content">Lorem ipsum dolor sit amet</div>
                    </div>
                <//>

                <${Card} title="Select">
                    <select class="or-select-raw">
                        <option>White</option>
                        <option>Gray</option>
                    </select>
                <//>

                <${Card} title="Spinner">
                    <svg width="24" height="24" viewBox="-25 -25 400 400">
                        <circle
                            stroke="var(--ui-text)"
                            stroke-opacity="0.1"
                            cx="175"
                            cy="175"
                            r="175"
                            stroke-width="50"
                            fill="none"
                        ></circle>
                        <circle
                            stroke="var(--ui-text)"
                            stroke-opacity="0.3"
                            transform="rotate(-90 175 175)"
                            cx="175"
                            cy="175"
                            r="175"
                            stroke-dasharray="1100"
                            stroke-width="50"
                            stroke-dashoffset="1100"
                            stroke-linecap="round"
                            fill="none"
                            style="stroke-dashoffset: 748px; transition: stroke-dashoffset 1s ease-out 0s;"
                        >
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from="0 175 175"
                                to="360 175 175"
                                dur="0.50s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </svg>
                <//>
            </div>
        </div>
    `
}

function Orchid() {
    return html`<svg height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#77B255" d="M19.602 32.329c6.509 6.506 17.254-7.669 15.72-7.669-7.669 0-22.227 1.161-15.72 7.669z"/><path fill="#77B255" d="M15.644 33.372C9.612 39.404-.07 26.263 1.352 26.263c3.81 0 9.374-.348 12.79.867 2.958 1.052 4.304 3.442 1.502 6.242z"/><path fill="#F4ABBA" d="M34.613 15.754c-.052-.901-.175-2.585-1.398-4.227-1.16-1.549-3.805-3.371-5.534-2.585.516-1.676-.264-4.125-1.191-5.49-1.179-1.736-4.262-3.843-8.146-3.026-1.754.369-4.18 2.036-4.632 3.864-1.18-1.471-4.22-1.675-6.015-1.222-2.026.511-3.154 1.777-3.739 2.461l.003-.005-.03.034-.027.033c-.583.689-1.656 1.994-1.847 4.074-.193 2.146.75 5.832 3.026 6.042.149.014.324.031.514.051-2.271.098-3.572 3.654-3.595 5.8-.022 2.102.926 3.506 1.443 4.243l-.003-.004c.008.01.019.024.025.036.007.011.02.023.026.036.523.733 1.525 2.094 3.515 2.776 1.958.669 5.553.656 6.567-1.236-.273 2.244 3.027 4.077 5.169 4.438 2.115.358 3.71-.358 4.55-.753l-.005.003c.013-.008.028-.015.041-.021l.041-.02c.838-.4 2.398-1.178 3.462-3.04.729-1.282 1.27-3.403.951-5.015l.192.127c1.826 1.224 4.63-1.119 5.705-2.938 1.044-1.761.932-4.424.932-4.436z"/><path fill="#EA596E" d="M27.542 13.542c-1.786-.997-4.874-.434-6.792.308-.266-.468-.621-.875-1.051-1.196 1.393-1.607 3.526-4.593 1.468-6.362-2.191-1.883-3.74 2.154-3.575 5.605-.068-.003-.132-.02-.201-.02-1.019 0-1.94.402-2.632 1.045-1.401-2.277-3.942-4.244-5.314-2.392-1.482 2.002 1.148 3.153 4.222 4.2-.09.329-.154.668-.154 1.025 0 .456.093.887.238 1.293-2.541.732-6.236 2.718-4.21 4.91 2.122 2.296 4.472-1.238 5.604-3.053.635.454 1.407.727 2.247.727.225 0 .441-.029.655-.066-.109 4.802 1.443 7.07 4.036 5.892 2.295-1.043-.137-5.299-1.781-7.165.316-.362.564-.779.729-1.241 7.008 2.544 8.589-2.351 6.511-3.51z"/><path fill="#BE1931" d="M17.707 17.459c-.679 0-.668-.562-.832-1.25-.532-2.233-2.381-6.308-4.601-9.163-.509-.654-.391-1.596.263-2.105.654-.508 1.596-.391 2.105.263 2.439 3.136 3.264 7.404 3.982 10.421.191.806.237 1.601-.569 1.792-.116.028-.233.042-.348.042z"/><path fill="#FFCC4D" d="M15.904 5.327c.498.684.079 1.838-.936 2.578l-.475.347c-1.016.739-2.243.785-2.741.101l-2.78-3.817c-.498-.684-.079-1.838.936-2.577l.475-.347c1.015-.739 2.242-.785 2.74-.101l2.781 3.816z"/></svg>`
}

render(html`<${App} />`, document.body)
