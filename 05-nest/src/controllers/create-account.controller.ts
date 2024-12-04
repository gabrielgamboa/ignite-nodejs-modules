import { Body, ConflictException, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Controller('/accounts')
export class CreateAccountController {

  constructor(
    private readonly prismaService: PrismaService
  ) { }


  @Post()
  @HttpCode(201)
  async handle(@Body() data: any) {
    const { name, email, password } = data;

    const userWithSameEmail = await this.prismaService.user.findUnique({ where: { email } });

    if (userWithSameEmail) {
      throw new ConflictException('User with same email address already exists');
    }

    await this.prismaService.user.create({ data: { name, email, password } });
  }
}