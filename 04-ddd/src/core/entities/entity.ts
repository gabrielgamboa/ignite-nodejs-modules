import { randomUUID } from "node:crypto";
import { Id } from "./id";

export class Entity<Props> {
  private _id: Id;
  protected props: Props; //protected allows to just access it from the class that extends Entity

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: Id) {
    this._id = id ?? new Id(id);
    this.props = props;
  }
}