import { Entity } from "@/core/entities/entity";
import { Id } from "@/core/entities/id";

interface StudentProps {
  name: string;
  email: string;
  password: string;
}

export class Student extends Entity<StudentProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  static create(props: StudentProps, id?: Id) {
    const student = new Student(props, id);
    return student;
  }
}
