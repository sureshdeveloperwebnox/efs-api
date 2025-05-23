-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_maintenance_plan_id_fkey";

-- AlterTable
ALTER TABLE "work_orders" ALTER COLUMN "maintenance_plan_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "crew_organization_idx" ON "crews"("organization_id");

-- CreateIndex
CREATE INDEX "crew_leader_idx" ON "crews"("leader_id");

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews" ADD CONSTRAINT "crews_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_maintenance_plan_id_fkey" FOREIGN KEY ("maintenance_plan_id") REFERENCES "maintenance_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
