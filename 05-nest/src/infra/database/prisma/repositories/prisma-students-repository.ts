import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { PrismastudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prismaService: PrismaService) { }

  async create(student: Student): Promise<void> {
    const data = PrismastudentMapper.toPrisma(student);

    await this.prismaService.user.create({
      data,
    })
  }


  async findById(id: string): Promise<Student | null> {
    const student = await this.prismaService.user.findUnique({ where: { id } });

    if (!student) {
      return null;
    }

    return PrismastudentMapper.toDomain(student);
  }
  async findByEmail(email: string): Promise<Student | null> {
    const student = await this.prismaService.user.findUnique({ where: { email } });

    if (!student) {
      return null;
    }

    return PrismastudentMapper.toDomain(student);
  }
}
