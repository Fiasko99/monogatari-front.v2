const cdn = import.meta.env.VITE_APP_CDN_URL
export default (avatar) => {
  if (avatar) {
    return cdn + avatar
  }
  return `${cdn}/default/characterAvatar.svg`
}