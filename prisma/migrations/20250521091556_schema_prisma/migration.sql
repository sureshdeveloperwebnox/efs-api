-- DropForeignKey
ALTER TABLE "work_orders" DROP CONSTRAINT "work_orders_asset_id_fkey";

-- AlterTable
ALTER TABLE "work_orders" ALTER COLUMN "asset_id" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "work_order_assets_asset_idx" ON "work_order_assets"("asset_id");

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assets" ADD CONSTRAINT "work_order_assets_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
