-- CreateEnum
CREATE TYPE "ClubInterest" AS ENUM ('ACADEMIC_PROFESSIONAL', 'STEM', 'RECREATION', 'ARTS_CULTURE', 'COMMUNITY_SERVICE');

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "interest" "ClubInterest";
