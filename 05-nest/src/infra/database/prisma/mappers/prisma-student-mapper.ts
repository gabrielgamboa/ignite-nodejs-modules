import { Id } from "@/core/entities/id";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { User as PrismaStudent, Prisma } from "@prisma/client";

export class PrismastudentMapper {
  static toDomain(raw: PrismaStudent): Student {
    return Student.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
      },
      new Id(raw.id),
    );
  }

  static toPrisma(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    };
  }
}