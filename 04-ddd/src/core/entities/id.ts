import { randomUUID } from 'node:crypto'

export class Id {
  private _id: string

  toValue() {
    return this._id
  }

  toString() {
    return this._id
  }

  constructor(id?: string) {
    this._id = id ?? randomUUID()
  }
}
