export interface Obj extends Object {
  [key: string]: any

  [key: number]: any
}

export type UnexpectType =
  | undefined
  | null
  | string
  | number
  | boolean
  | Date
  | Error
  | RegExp
  | FileList
  | File
  | Element
  | Window
  | Document
