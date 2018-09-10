/**
 * @description If param obj is expected that can be copied
 * */
export function expectedObjType(obj) {
  return typeof obj === 'object'
    && !(obj === null
      || obj instanceof Date
      || obj instanceof Error
      || obj instanceof RegExp)
    && (typeof window === 'undefined'
      || !(obj instanceof FileList
        || obj instanceof File
        || obj instanceof Element))
}
