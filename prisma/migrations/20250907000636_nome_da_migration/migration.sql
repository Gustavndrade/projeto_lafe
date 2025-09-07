-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('scheduled', 'in_progress', 'finished', 'walkover');

-- CreateEnum
CREATE TYPE "BracketType" AS ENUM ('single_elimination', 'double_elimination', 'round_robin');

-- CreateEnum
CREATE TYPE "BracketMatchStatus" AS ENUM ('pending', 'scheduled', 'in_progress', 'finished', 'walkover');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rm" TEXT NOT NULL,
    "sex" TEXT,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTeam" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "PlayerTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "bestOfSets" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TournamentEntry" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "TournamentEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "teamAId" INTEGER,
    "teamBId" INTEGER,
    "status" "MatchStatus" NOT NULL DEFAULT 'scheduled',
    "setsWonA" INTEGER NOT NULL DEFAULT 0,
    "setsWonB" INTEGER NOT NULL DEFAULT 0,
    "setsToWin" INTEGER NOT NULL,
    "winnerTeamId" INTEGER,
    "scheduledAt" TIMESTAMP(3),
    "location" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "isTieBreak" BOOLEAN NOT NULL DEFAULT false,
    "pointsA" INTEGER NOT NULL DEFAULT 0,
    "pointsB" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketStage" (
    "id" SERIAL NOT NULL,
    "tournamentId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BracketType" NOT NULL DEFAULT 'single_elimination',
    "seedingMethod" TEXT,
    "settingsJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BracketStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketGroup" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BracketGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketRound" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BracketRound_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketParticipant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "teamId" INTEGER,
    "metaJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BracketParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketStageParticipant" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "seed" INTEGER,

    CONSTRAINT "BracketStageParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketMatch" (
    "id" SERIAL NOT NULL,
    "stageId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "status" "BracketMatchStatus" NOT NULL DEFAULT 'pending',
    "participantAId" INTEGER,
    "participantBId" INTEGER,
    "scoreA" INTEGER,
    "scoreB" INTEGER,
    "childMatchId" INTEGER,
    "childPosition" INTEGER,
    "winnerParticipantId" INTEGER,
    "scheduledAt" TIMESTAMP(3),
    "location" TEXT,
    "metaJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BracketMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BracketMatchGame" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "isTieBreak" BOOLEAN NOT NULL DEFAULT false,
    "pointsA" INTEGER NOT NULL DEFAULT 0,
    "pointsB" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "metaJson" JSONB,

    CONSTRAINT "BracketMatchGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Course_name_key" ON "Course"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_rm_key" ON "Player"("rm");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTeam_playerId_teamId_key" ON "PlayerTeam"("playerId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentEntry_tournamentId_teamId_key" ON "TournamentEntry"("tournamentId", "teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Set_matchId_number_key" ON "Set"("matchId", "number");

-- CreateIndex
CREATE INDEX "BracketStage_tournamentId_idx" ON "BracketStage"("tournamentId");

-- CreateIndex
CREATE UNIQUE INDEX "BracketGroup_stageId_number_key" ON "BracketGroup"("stageId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "BracketRound_stageId_groupId_number_key" ON "BracketRound"("stageId", "groupId", "number");

-- CreateIndex
CREATE INDEX "BracketStageParticipant_stageId_seed_idx" ON "BracketStageParticipant"("stageId", "seed");

-- CreateIndex
CREATE UNIQUE INDEX "BracketStageParticipant_stageId_participantId_key" ON "BracketStageParticipant"("stageId", "participantId");

-- CreateIndex
CREATE INDEX "BracketMatch_stageId_groupId_roundId_idx" ON "BracketMatch"("stageId", "groupId", "roundId");

-- CreateIndex
CREATE INDEX "BracketMatch_childMatchId_idx" ON "BracketMatch"("childMatchId");

-- CreateIndex
CREATE UNIQUE INDEX "BracketMatch_stageId_groupId_roundId_number_key" ON "BracketMatch"("stageId", "groupId", "roundId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "BracketMatchGame_matchId_number_key" ON "BracketMatchGame"("matchId", "number");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTeam" ADD CONSTRAINT "PlayerTeam_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEntry" ADD CONSTRAINT "TournamentEntry_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentEntry" ADD CONSTRAINT "TournamentEntry_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_winnerTeamId_fkey" FOREIGN KEY ("winnerTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketStage" ADD CONSTRAINT "BracketStage_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketGroup" ADD CONSTRAINT "BracketGroup_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "BracketStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketRound" ADD CONSTRAINT "BracketRound_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "BracketStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketRound" ADD CONSTRAINT "BracketRound_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "BracketGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketParticipant" ADD CONSTRAINT "BracketParticipant_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketStageParticipant" ADD CONSTRAINT "BracketStageParticipant_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "BracketStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketStageParticipant" ADD CONSTRAINT "BracketStageParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "BracketParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "BracketStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "BracketGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "BracketRound"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_participantAId_fkey" FOREIGN KEY ("participantAId") REFERENCES "BracketParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_participantBId_fkey" FOREIGN KEY ("participantBId") REFERENCES "BracketParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_winnerParticipantId_fkey" FOREIGN KEY ("winnerParticipantId") REFERENCES "BracketParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatch" ADD CONSTRAINT "BracketMatch_childMatchId_fkey" FOREIGN KEY ("childMatchId") REFERENCES "BracketMatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BracketMatchGame" ADD CONSTRAINT "BracketMatchGame_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "BracketMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
