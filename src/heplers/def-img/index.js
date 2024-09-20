const cdn = import.meta.env.VITE_APP_CDN_URL
export default (image = null) => {
  if (image) {
    return cdn + image
  }
  return `${cdn}/default/background.jpg`
}