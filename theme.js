/**
 * Turn theme key (CSS custom properties) into Tailwind color
 * @example
 * :root { --ui-hover: theme(colors.gray.15); }
 * .btn { @apply bg-ui-hover };
 */

const keys = [
    'background',
    'text',
    'text-placeholder',
    'text-inverted',
    'hover',
    'active',
    'rest',
    'interactive-text',
    'primary-hover',
    'primary-active',
    'primary-rest',
    'primary-interactive-text',
    'primary-outline-rest',
    'primary-outline-hover',
    'primary-outline-hover-background',
    'primary-outline-hover-text',
    'primary-outline-active',
    'primary-outline-active-background',
    'primary-outline-active-text',
    'disabled',
    'disabled-text',
    'focus',
    'field',
    'modal-background',
]

const customProperties = {}

keys.forEach(key => {
    customProperties[key] = `var(--ui-${key})`
})

module.exports = {
    ui: customProperties
}
