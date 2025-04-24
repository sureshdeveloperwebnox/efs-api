/*
  Warnings:

  - Changed the type of `assigned_to` on the `work_orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "maintenance_plan_assets" ALTER COLUMN "created_at" SET DEFAULT '',
ALTER COLUMN "updated_at" SET DEFAULT '';

-- AlterTable
ALTER TABLE "maintenance_plans" ALTER COLUMN "created_at" SET DEFAULT '',
ALTER COLUMN "updated_at" SET DEFAULT '';

-- AlterTable
ALTER TABLE "work_orders" DROP COLUMN "assigned_to",
ADD COLUMN     "assigned_to" BIGINT NOT NULL;
