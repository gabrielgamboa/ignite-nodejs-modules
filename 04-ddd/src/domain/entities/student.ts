import { Entity } from '@/core/entities/entity'
import { Id } from '@/core/entities/id'

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps> {
  static create(props: StudentProps, id?: Id) {
    const student = new Student(props, id)
    return student
  }
}
