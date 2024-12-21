import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = [];

  async create(student: Student): Promise<void> {
    this.items.push(student);
  }
  async findById(id: string): Promise<Student | null> {
    return this.items.find(student => student.id.toValue() === id) || null;
  }
  async findByEmail(email: string): Promise<Student | null> {
    return this.items.find(student => student.email === email) || null;
  }

}