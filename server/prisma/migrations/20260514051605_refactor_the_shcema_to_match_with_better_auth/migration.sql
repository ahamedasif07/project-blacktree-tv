/*
  Warnings:

  - The values [GOOGLE,APPLE,EMAIL] on the enum `AuthProvider` will be removed. If these variants are still used in the database, this will fail.
  - The values [FREE,BASIC] on the enum `SubscriptionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `refreshToken` on the `Session` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Subscription` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `banner` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `UserProfile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthProvider_new" AS ENUM ('credential', 'google', 'apple');
ALTER TABLE "Account" ALTER COLUMN "provider" TYPE "AuthProvider_new" USING ("provider"::text::"AuthProvider_new");
ALTER TYPE "AuthProvider" RENAME TO "AuthProvider_old";
ALTER TYPE "AuthProvider_new" RENAME TO "AuthProvider";
DROP TYPE "public"."AuthProvider_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionType_new" AS ENUM ('STANDARD', 'PREMIUM', 'ELITE');
ALTER TABLE "Subscription" ALTER COLUMN "plan" TYPE "SubscriptionType_new" USING ("plan"::text::"SubscriptionType_new");
ALTER TYPE "SubscriptionType" RENAME TO "SubscriptionType_old";
ALTER TYPE "SubscriptionType_new" RENAME TO "SubscriptionType";
DROP TYPE "public"."SubscriptionType_old";
COMMIT;

-- DropIndex
DROP INDEX "Session_refreshToken_key";

-- DropIndex
DROP INDEX "UserProfile_username_idx";

-- DropIndex
DROP INDEX "UserProfile_username_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "idToken" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "tokenType" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "refreshToken",
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "currency" SET DEFAULT 'BDT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "banner",
DROP COLUMN "passwordHash";

-- AlterTable
ALTER TABLE "UserProfile" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "UserRoleMapping" ADD COLUMN     "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "ChatBan_bannedById_idx" ON "ChatBan"("bannedById");

-- CreateIndex
CREATE INDEX "ChatBan_expiresAt_idx" ON "ChatBan"("expiresAt");

-- CreateIndex
CREATE INDEX "LiveChat_userId_idx" ON "LiveChat"("userId");

-- CreateIndex
CREATE INDEX "ModerationLog_targetUserId_idx" ON "ModerationLog"("targetUserId");

-- CreateIndex
CREATE INDEX "PaymentHistory_subscriptionId_idx" ON "PaymentHistory"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");
