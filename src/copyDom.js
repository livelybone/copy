/**
 * @param {Element} dom
 * @param {Object} options - Optional
 * @returns {Boolean}
 * */
export default function (dom, options) {
  /**
   * @name defaultObj
   * @property {Boolean} clearSelect
   * @property {Boolean} cut - Whether to cut the value of input element or not
   * */
  var defaultObj = {
    clearSelect: false,
    cut: false
  }
  var opts = Object.assign({}, options, defaultObj)
  var clearSelect = opts.clearSelect
  var cut = opts.cut

  var range
  if (window.getSelection) {
    var selection = window.getSelection()
    range = window.document.createRange()
    selection.removeAllRanges()
    range.selectNode(dom)
    selection.addRange(range)
  } else if (document.body.createTextRange) {
    /* ie */
    range = document.body.createTextRange()
    range.moveToElementText(dom)
    range.select()
  }

  /* use document.execCommand `copy` */
  var success = window.document.execCommand('copy')

  if (clearSelect) selection.removeAllRanges()

  if (cut) dom.value = ''
  return success
}