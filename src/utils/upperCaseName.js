export default (string = "") => {
  if (typeof string !== 'string') {
    return String(string || '')
  }
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
