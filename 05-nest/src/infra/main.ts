import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Env } from "./env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // tipa o config service com Env, e força dizendo que as variáveis já estão validadas
  const configService: ConfigService<Env, true> = app.get(ConfigService);

  // inferir o tipo de port para ser number, se não vai acusar de ser tipo any
  const port = configService.get("PORT", { infer: true });

  await app.listen(port);
}
bootstrap();
