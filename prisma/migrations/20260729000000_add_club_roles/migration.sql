-- Preserve existing template admins as Club Compass super admins.
ALTER TYPE "Role" RENAME TO "Role_old";
CREATE TYPE "Role" AS ENUM ('USER', 'CLUB_ADMIN', 'SUPER_ADMIN');

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User"
  ALTER COLUMN "role" TYPE "Role"
  USING (
    CASE
      WHEN "role"::text = 'ADMIN' THEN 'SUPER_ADMIN'
      ELSE "role"::text
    END
  )::"Role";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';

DROP TYPE "Role_old";
