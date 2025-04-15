export function lowercase(str: string) {
  return str.toLowerCase()
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function hasNumber(str: string) {
  return /[0-9]/.test(str)
}

export function hasSpecialChar(str: string) {
  return /[!?@#$&^*_\-=+]/.test(str)
}

export function hasLowercaseChar(str: string) {
  return /[a-z]/.test(str)
}

export function hasUppercaseChar(str: string) {
  return /[A-Z]/.test(str)
}
