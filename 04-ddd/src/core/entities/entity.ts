import { randomUUID } from "crypto";

export class Entity<Props> {
  private _id: string;
  protected props: Props;

  constructor(props: Props, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }
}