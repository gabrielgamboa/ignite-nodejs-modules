import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth-guard";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { z } from "zod";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/usecases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";

const pageQueryParamSchema = z
  .string()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/questions")
export class FetchRecentQuestionsController {
  constructor(
    private readonly fetchRecentQuestions: FetchRecentQuestionsUseCase,
  ) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new Error();
    }

    const questions = result.value.questions;

    return { questions: questions.map(QuestionPresenter.toHttp) };
  }
}
