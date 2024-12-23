import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { RegisterStudentUseCase } from "@/domain/forum/application/usecases/register-student";

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller("/accounts")
export class CreateAccountController {
  constructor(private readonly registerStudentUseCase: RegisterStudentUseCase) { }

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() data: CreateAccountBodySchema) {
    const { name, email, password } = data;

    await this.registerStudentUseCase.execute({
      email,
      name,
      password,
    });
  }
}
