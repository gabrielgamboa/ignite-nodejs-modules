import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

interface AttachmentProps {
  title: string;
  link: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  get link() {
    return this.props.link;
  }

  static create(props: AttachmentProps, id?: Id) {
    const attachment = new Attachment(props, id);
    return attachment;
  }
}
