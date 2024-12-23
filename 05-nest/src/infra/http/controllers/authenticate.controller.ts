import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { compare } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { JwtService } from "@nestjs/jwt";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/usecases/authenticate-student";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateController {
  constructor(
    private readonly authenticateStudentUseCase: AuthenticateStudentUseCase
  ) { }

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() data: AuthenticateBodySchema) {
    const { email, password } = data;

    const result = await this.authenticateStudentUseCase.execute({
      email,
      password,
    });

    if (result.isRight()) {
      return {
        access_token: result.value.access_token,
      }
    }
  }
}
