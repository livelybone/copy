import copyDom from './copyDom'

/**
 * @param {String} text
 * @return {(Boolean|Promise)}
 * */
export default function (text) {
  if (!navigator.clipboard) {
    var textEl = document.createElement('span')
    textEl.style.position = 'fixed'
    textEl.style.left = '0'
    textEl.style.top = '0'
    textEl.style.zIndex = '-999'
    textEl.innerText = text
    document.body.appendChild(textEl)
    var bool = copyDom(textEl)
    document.body.removeChild(textEl)
    return bool
  }
  return navigator.clipboard.writeText(text)
}
