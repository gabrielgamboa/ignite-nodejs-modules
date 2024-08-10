import { PrismaClient } from "@prisma/client";
import "dotenv/config";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

const prisma = new PrismaClient();

function generateDatabaseUrlToTest(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();

    process.env.DATABASE_URL = generateDatabaseUrlToTest(schema);

    execSync("npx prisma migrate deploy"); // apenas roda as migrations, não compara com o schema atual igual "dev"

    return {
      async teardown() {
        execSync("npx prisma migrate deploy"); // apenas roda as migrations, não compara com o schema atual igual "dev"

        await prisma.$executeRawUnsafe(
          'DROP SCHEMA IF EXISTS "' + schema + '" CASCADE'
        );

        await prisma.$disconnect();
      },
    };
  },
};
