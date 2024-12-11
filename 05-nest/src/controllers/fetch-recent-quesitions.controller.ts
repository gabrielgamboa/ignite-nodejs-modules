import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod";

const pageQueryParamSchema = z.string().default('1').transform(Number).pipe(z.number().min(1));
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>


@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }


  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const perPage = 1;

    const questions = await this.prismaService.question.findMany({
      take: 1,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return { questions }
  }
}