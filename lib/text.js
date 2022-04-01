export function capitalize(string) {
  if (!string) return string
  return string[0].toUpperCase() + string.substring(1)
}

export function isCharacterALetter(char) {
  return /[a-zA-Z]/.test(char)
}
