import { randomUUID } from "node:crypto";

export class Id {
  private value: string;

  toValue() {
    return this.value;
  }

  toString() {
    return this.value;
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  equals(id: Id) {
    return this.toValue() === id.toValue();
  }
}
