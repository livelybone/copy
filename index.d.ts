export interface CopyDomOptions {
  /**
   * Should clear selection after copy
   *
   * Default to false
   * */
  clearSelect: boolean
  /**
   * Should cut the dom(like <input>) value after copy
   *
   * Default to false
   * */
  cut: boolean
}

/**
 * @param {Element} dom
 * @param {Object} options - Optional
 * @returns {Boolean}
 * */
declare function copyDom(dom: Element, options?: CopyDomOptions): boolean

/**
 * @param {String} text
 * @return {Promise<boolean>}
 * */
declare function copyText(text: string): Promise<true>

export interface Obj extends Object {
  [key: string]: any

  [key: number]: any
}

declare function objectDeepCopy<T extends Obj = Obj>(obj: T): T

declare function objectSimpleCopy(obj: Obj): any

declare function objectDeepMerge(target: Obj, ...rest: Obj[]): Obj

declare function expectedObjType(obj: Obj): boolean

declare function newObj(target: Obj): {}

export {
  copyDom,
  copyText,
  expectedObjType,
  newObj,
  objectDeepCopy,
  objectDeepMerge,
  objectSimpleCopy,
}
