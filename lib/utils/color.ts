/**
 * Converts a hex color string to space-separated RGB values.
 * This format matches the CSS custom property convention used in globals.css,
 * allowing Tailwind's alpha-value syntax to work (e.g. `rgb(var(--color-primary) / 0.5)`).
 *
 * @example hexToRgbValues('#0A6EBD') → '10 110 189'
 */
export function hexToRgbValues(hex: string): string | null {
  const sanitized = hex.replace(/^#/, '')

  if (sanitized.length !== 3 && sanitized.length !== 6) {
    return null
  }

  const fullHex =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((char) => char + char)
          .join('')
      : sanitized

  const num = parseInt(fullHex, 16)

  if (Number.isNaN(num)) {
    return null
  }

  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  return `${r} ${g} ${b}`
}

/**
 * Derives a lighter tint from a hex color for use as primary-light.
 * Blends the color with white at the given ratio.
 */
export function hexToLightTint(hex: string, ratio = 0.92): string | null {
  const sanitized = hex.replace(/^#/, '')

  if (sanitized.length !== 3 && sanitized.length !== 6) {
    return null
  }

  const fullHex =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((char) => char + char)
          .join('')
      : sanitized

  const num = parseInt(fullHex, 16)

  if (Number.isNaN(num)) {
    return null
  }

  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  const lr = Math.round(r + (255 - r) * ratio)
  const lg = Math.round(g + (255 - g) * ratio)
  const lb = Math.round(b + (255 - b) * ratio)

  return `${lr} ${lg} ${lb}`
}

/**
 * Derives a darker shade from a hex color for hover states.
 */
export function hexToDarkerShade(hex: string, factor = 0.82): string | null {
  const sanitized = hex.replace(/^#/, '')

  if (sanitized.length !== 3 && sanitized.length !== 6) {
    return null
  }

  const fullHex =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((char) => char + char)
          .join('')
      : sanitized

  const num = parseInt(fullHex, 16)

  if (Number.isNaN(num)) {
    return null
  }

  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  const dr = Math.round(r * factor)
  const dg = Math.round(g * factor)
  const db = Math.round(b * factor)

  return `${dr} ${dg} ${db}`
}
