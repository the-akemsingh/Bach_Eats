/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - Added the required column `heading` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meal` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "title",
ADD COLUMN     "heading" TEXT NOT NULL,
ADD COLUMN     "meal" TEXT NOT NULL;
