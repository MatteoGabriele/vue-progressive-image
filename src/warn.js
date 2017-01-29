/**
 * Whining helper
 * @param  {String} message
 */
export default function (...message) {
  /* eslint-disable */
  console.warn(`[vue-progressive-image] ${message.join(' ')}`)
  /* eslint-enable */
}
