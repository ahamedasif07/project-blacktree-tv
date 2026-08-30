/*
  Warnings:

  - You are about to drop the column `idToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Subscriber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "idToken",
DROP COLUMN "scope",
DROP COLUMN "tokenType";

-- AlterTable
ALTER TABLE "Subscriber" DROP COLUMN "source";
