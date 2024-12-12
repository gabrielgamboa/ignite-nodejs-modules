import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: Id) {
    const instructor = new Instructor(props, id);
    return instructor;
  }
}
