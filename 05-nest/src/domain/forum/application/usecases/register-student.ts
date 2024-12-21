import { Either, left, right } from "@/core/either";
import { Id } from "../../../../core/entities/id";
import { Student } from "../../enterprise/entities/student";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "../repositories/students-repository";
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error";
import { HashGenerator } from "../cryptography/hash-generator";

interface RegisterStudentUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentUseCaseResponse = Either<
  StudentAlreadyExistsError,
  {
    student: Student;
  }
>;

@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private readonly studentsRepository: StudentsRepository,
    private readonly hashGenerator: HashGenerator,
  ) { }

  async execute({
    email,
    name,
    password
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentAlreadyExists = await this.studentsRepository.findByEmail(email);

    if (studentAlreadyExists) {
      return left(new StudentAlreadyExistsError(email)); //return left
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const student = Student.create({
      email,
      name,
      password: hashedPassword,
    })

    console.log(student);

    await this.studentsRepository.create(student);

    return right({ student })
  }
}
