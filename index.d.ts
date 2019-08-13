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

/**
 * @description Deep copy, has the ability to deal nested loop
 * */
declare function objectDeepCopy<T extends Obj = Obj>(obj: T): T

/**
 * @description Deep copy, cannot deal nested loop
 * */
declare function objectSimpleCopy(obj: Obj): any

/**
 * @description Deep merge, cannot deal nested loop
 * @return The first parameter object which has been merged
 * */
declare function objectDeepMerge<T extends Obj = Obj>(
  target: T,
  ...rest: T[]
): any

export declare type ReferencedPath = string
export declare type QuotePath = string
export declare type CircularStructurePaths = [ReferencedPath, QuotePath]

/**
 * @description Returns the start dimension of the nested loop
 * */
declare function isCircularStructure(obj: Obj): CircularStructurePaths | null

export {
  copyDom,
  copyText,
  isCircularStructure,
  objectDeepCopy,
  objectDeepMerge,
  objectSimpleCopy,
}
