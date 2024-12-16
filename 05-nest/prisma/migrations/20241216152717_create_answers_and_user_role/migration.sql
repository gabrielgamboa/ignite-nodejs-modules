/*
  Warnings:

  - You are about to drop the column `authorId` on the `Question` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[best_answer_id]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'INSTRUCTOR');

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_authorId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "authorId",
ADD COLUMN     "author_id" TEXT NOT NULL,
ADD COLUMN     "best_answer_id" TEXT,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE "answers" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "author_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_best_answer_id_key" ON "Question"("best_answer_id");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_best_answer_id_fkey" FOREIGN KEY ("best_answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
