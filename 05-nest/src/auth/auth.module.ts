import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Env } from "src/env";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get("JWT_PRIVATE_KEY");
        const publicKey = config.get("JWT_PUBLIC_KEY");

        return {
          signOptions: { algorithm: "RS256" },
          publicKey: Buffer.from(publicKey, "base64"),
          privateKey: Buffer.from(privateKey, "base64"),
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
