import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

function generateDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL env.");
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set("schema", schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseUrl = generateDatabaseUrl(schemaId);

  process.env.DATABASE_URL = databaseUrl;

  execSync("npx prisma migrate deploy");
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
