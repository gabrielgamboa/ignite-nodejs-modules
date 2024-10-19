import { randomUUID } from "crypto";

export class Entity<Props> {
  private _id: string;
  protected props: Props; //protected allows to just access it from the class that extends Entity

  constructor(props: Props, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}