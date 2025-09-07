/*
  Warnings:

  - You are about to drop the column `sex` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `BracketGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketMatchGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketRound` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketStage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BracketStageParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PlayerTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tournament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `TournamentEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('M', 'F', 'OTHER');

-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "TournamentStatus" AS ENUM ('draft', 'open_registration', 'registration_closed', 'in_progress', 'finished', 'cancelled');

-- AlterTable
ALTER TABLE "BracketGroup" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketMatch" ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "referee" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketMatchGame" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketParticipant" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketRound" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketStage" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BracketStageParticipant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "referee" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "sex",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "PlayerTeam" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "leftAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Set" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "finishedAt" TIMESTAMP(3),
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "TeamStatus" NOT NULL DEFAULT 'active',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "maxTeams" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "status" "TournamentStatus" NOT NULL DEFAULT 'draft',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedBy" INTEGER;

-- AlterTable
ALTER TABLE "TournamentEntry" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "BracketGroup_stageId_idx" ON "BracketGroup"("stageId");

-- CreateIndex
CREATE INDEX "BracketMatch_status_idx" ON "BracketMatch"("status");

-- CreateIndex
CREATE INDEX "BracketMatch_scheduledAt_idx" ON "BracketMatch"("scheduledAt");

-- CreateIndex
CREATE INDEX "BracketMatch_createdAt_idx" ON "BracketMatch"("createdAt");

-- CreateIndex
CREATE INDEX "BracketMatchGame_matchId_idx" ON "BracketMatchGame"("matchId");

-- CreateIndex
CREATE INDEX "BracketMatchGame_finished_idx" ON "BracketMatchGame"("finished");

-- CreateIndex
CREATE INDEX "BracketParticipant_teamId_idx" ON "BracketParticipant"("teamId");

-- CreateIndex
CREATE INDEX "BracketParticipant_createdAt_idx" ON "BracketParticipant"("createdAt");

-- CreateIndex
CREATE INDEX "BracketRound_stageId_idx" ON "BracketRound"("stageId");

-- CreateIndex
CREATE INDEX "BracketRound_groupId_idx" ON "BracketRound"("groupId");

-- CreateIndex
CREATE INDEX "BracketStage_createdAt_idx" ON "BracketStage"("createdAt");

-- CreateIndex
CREATE INDEX "BracketStageParticipant_stageId_idx" ON "BracketStageParticipant"("stageId");

-- CreateIndex
CREATE INDEX "BracketStageParticipant_participantId_idx" ON "BracketStageParticipant"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_code_key" ON "Course"("code");

-- CreateIndex
CREATE INDEX "Course_code_idx" ON "Course"("code");

-- CreateIndex
CREATE INDEX "Course_isActive_idx" ON "Course"("isActive");

-- CreateIndex
CREATE INDEX "Course_createdAt_idx" ON "Course"("createdAt");

-- CreateIndex
CREATE INDEX "Match_tournamentId_idx" ON "Match"("tournamentId");

-- CreateIndex
CREATE INDEX "Match_status_idx" ON "Match"("status");

-- CreateIndex
CREATE INDEX "Match_scheduledAt_idx" ON "Match"("scheduledAt");

-- CreateIndex
CREATE INDEX "Match_createdAt_idx" ON "Match"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Player_email_key" ON "Player"("email");

-- CreateIndex
CREATE INDEX "Player_rm_idx" ON "Player"("rm");

-- CreateIndex
CREATE INDEX "Player_email_idx" ON "Player"("email");

-- CreateIndex
CREATE INDEX "Player_courseId_idx" ON "Player"("courseId");

-- CreateIndex
CREATE INDEX "Player_isActive_idx" ON "Player"("isActive");

-- CreateIndex
CREATE INDEX "Player_createdAt_idx" ON "Player"("createdAt");

-- CreateIndex
CREATE INDEX "PlayerTeam_playerId_idx" ON "PlayerTeam"("playerId");

-- CreateIndex
CREATE INDEX "PlayerTeam_teamId_idx" ON "PlayerTeam"("teamId");

-- CreateIndex
CREATE INDEX "PlayerTeam_isActive_idx" ON "PlayerTeam"("isActive");

-- CreateIndex
CREATE INDEX "Set_matchId_idx" ON "Set"("matchId");

-- CreateIndex
CREATE INDEX "Set_finished_idx" ON "Set"("finished");

-- CreateIndex
CREATE INDEX "Team_courseId_idx" ON "Team"("courseId");

-- CreateIndex
CREATE INDEX "Team_status_idx" ON "Team"("status");

-- CreateIndex
CREATE INDEX "Team_createdAt_idx" ON "Team"("createdAt");

-- CreateIndex
CREATE INDEX "Tournament_year_idx" ON "Tournament"("year");

-- CreateIndex
CREATE INDEX "Tournament_status_idx" ON "Tournament"("status");

-- CreateIndex
CREATE INDEX "Tournament_startDate_idx" ON "Tournament"("startDate");

-- CreateIndex
CREATE INDEX "Tournament_createdAt_idx" ON "Tournament"("createdAt");

-- CreateIndex
CREATE INDEX "TournamentEntry_tournamentId_idx" ON "TournamentEntry"("tournamentId");

-- CreateIndex
CREATE INDEX "TournamentEntry_teamId_idx" ON "TournamentEntry"("teamId");

-- CreateIndex
CREATE INDEX "TournamentEntry_registeredAt_idx" ON "TournamentEntry"("registeredAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
