import { Id } from "@/core/entities/id"
import { Student } from "@/domain/forum/enterprise/entities/student"
import { faker } from "@faker-js/faker";

export const makeStudent = (override: Partial<Student> = {}, id?: Id): Student => {
  return Student.create({
    email: faker.internet.email(),
    name: faker.person.firstName(),
    password: faker.internet.password(),
    ...override,
  }, id);
}