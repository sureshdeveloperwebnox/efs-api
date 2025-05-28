/*
  Warnings:

  - The values [DRAFT,OPEN,SCHEDULED,IN_PROGRESS,ON_HOLD] on the enum `WorkOrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ON_HOLD] on the enum `WorkOrderTaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "WorkOrderStatus_new" AS ENUM ('PENDING', 'ASSIGNED', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'APPROVED', 'CLOSED', 'CANCELLED');
ALTER TABLE "work_orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "work_orders" ALTER COLUMN "status" TYPE "WorkOrderStatus_new" USING ("status"::text::"WorkOrderStatus_new");
ALTER TYPE "WorkOrderStatus" RENAME TO "WorkOrderStatus_old";
ALTER TYPE "WorkOrderStatus_new" RENAME TO "WorkOrderStatus";
DROP TYPE "WorkOrderStatus_old";
ALTER TABLE "work_orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "WorkOrderTaskStatus_new" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');
ALTER TABLE "work_order_tasks" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "work_order_tasks" ALTER COLUMN "status" TYPE "WorkOrderTaskStatus_new" USING ("status"::text::"WorkOrderTaskStatus_new");
ALTER TYPE "WorkOrderTaskStatus" RENAME TO "WorkOrderTaskStatus_old";
ALTER TYPE "WorkOrderTaskStatus_new" RENAME TO "WorkOrderTaskStatus";
DROP TYPE "WorkOrderTaskStatus_old";
ALTER TABLE "work_order_tasks" ALTER COLUMN "status" SET DEFAULT 'NOT_STARTED';
COMMIT;

-- AlterTable
ALTER TABLE "work_orders" ALTER COLUMN "status" SET DEFAULT 'PENDING';
