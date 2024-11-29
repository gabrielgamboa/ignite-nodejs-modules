import { Id } from "./id";

export abstract class Entity<Props> {
  private _id: Id;
  protected props: Props; // protected allows to just access it from the class that extends Entity

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: Id) {
    this._id = id ?? new Id(id);
    this.props = props;
  }

  public equals(entity: Entity<any>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
