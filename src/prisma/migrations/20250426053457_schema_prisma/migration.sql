-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'STANDARD', 'PROFESSIONAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STAFF', 'TECHNICIAN', 'DISPATCHER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('AVAILABLE', 'IN_USE', 'UNDER_MAINTENANCE', 'DAMAGED');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('OPERATIONAL', 'NEEDS_MAINTENANCE', 'UNDER_REPAIR', 'DECOMMISSIONED');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMIANNUALLY', 'ANNUALLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "FrequencyUnitType" AS ENUM ('DAYS', 'WEEKS', 'MONTHS');

-- CreateEnum
CREATE TYPE "Prioirty" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('DRAFT', 'OPEN', 'SCHEDULED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkOrderTaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'BANK_TRANSFER', 'CASH', 'CHECK', 'PAYPAL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ALERT', 'WARNING', 'ERROR');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'READ', 'DISMISSED');

-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('USER', 'WORK_ORDER', 'SERVICE', 'INVOICE', 'ASSET');

-- CreateTable
CREATE TABLE "organizations" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL DEFAULT '',
    "phone" VARCHAR(20) NOT NULL DEFAULT '',
    "organization_name" VARCHAR(100) NOT NULL DEFAULT '',
    "industry_name" VARCHAR(100) NOT NULL DEFAULT '',
    "pincode" VARCHAR(10) NOT NULL DEFAULT '',
    "website" VARCHAR(100) NOT NULL DEFAULT '',
    "timezone" VARCHAR(50) NOT NULL DEFAULT '',
    "plan_type" "PlanType" NOT NULL DEFAULT 'FREE',
    "subscription_start_date" VARCHAR(50) NOT NULL DEFAULT '',
    "subscription_end_date" VARCHAR(50) NOT NULL DEFAULT '',
    "file_storage_limit" BIGINT NOT NULL DEFAULT 1,
    "data_storage_limit" BIGINT NOT NULL DEFAULT 1,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',
    "currencyid" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "email" VARCHAR(100) NOT NULL DEFAULT '',
    "password_hash" VARCHAR(100) NOT NULL DEFAULT '',
    "isVerified_Email" BOOLEAN NOT NULL DEFAULT false,
    "isVerified_PhoneNumber" BOOLEAN NOT NULL DEFAULT false,
    "first_name" VARCHAR(50) NOT NULL DEFAULT '',
    "last_name" VARCHAR(50) NOT NULL DEFAULT '',
    "phone" VARCHAR(20) NOT NULL DEFAULT '',
    "job_title" VARCHAR(100) NOT NULL DEFAULT '',
    "user_type" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "is_active" SMALLINT NOT NULL DEFAULT 0,
    "last_login_at" VARCHAR(50) NOT NULL DEFAULT '',
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "access_rights" JSONB NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" BIGSERIAL NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "exchange_rate" DECIMAL(10,4) NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role_assignments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "profile_id" BIGINT NOT NULL,
    "assigned_at" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "user_role_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "skill_id" BIGINT NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "proficiency_level" "ProficiencyLevel" NOT NULL DEFAULT 'BEGINNER',
    "created_at" TEXT NOT NULL DEFAULT '',
    "updated_at" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_hours" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "day_of_week" "DayOfWeek" NOT NULL DEFAULT 'SUNDAY',
    "start_time" VARCHAR(50) NOT NULL,
    "end_time" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "business_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "holidays" (
    "id" BIGSERIAL NOT NULL,
    "orga" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "holiday_date" VARCHAR(20) NOT NULL,
    "is_recurring" SMALLINT NOT NULL DEFAULT 0,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "holidays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_off_requests" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "start_date" VARCHAR(20) NOT NULL,
    "end_date" VARCHAR(20) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "time_off_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crews_leader" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "leader_id" BIGINT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "crews_leader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crew_members" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "crew_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "crew_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments_organization" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "equipment_type" VARCHAR(100) NOT NULL,
    "status" "EquipmentStatus" NOT NULL,
    "location" TEXT NOT NULL,
    "availability_date" VARCHAR(20) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "equipments_organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "industry" VARCHAR(100) NOT NULL,
    "tax_id" VARCHAR(50) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "website" VARCHAR(100) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "is_active" SMALLINT NOT NULL DEFAULT 0,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "required_skills" JSONB NOT NULL DEFAULT '{}',
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_types" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "service_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "asset_name" VARCHAR(100) NOT NULL,
    "serial_number" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "manufacturer" VARCHAR(100) NOT NULL,
    "status" "AssetStatus" NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "purchase_date" VARCHAR(50) NOT NULL,
    "warranty_expiry" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parts" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "inventory_count" INTEGER NOT NULL,
    "reorder_level" INTEGER NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_plans" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" VARCHAR(50) NOT NULL,
    "end_date" VARCHAR(50) NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "frequency_unit" INTEGER NOT NULL,
    "frequency_unit_type" "FrequencyUnitType" NOT NULL,
    "is_active" SMALLINT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "maintenance_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_plan_assets" (
    "id" BIGSERIAL NOT NULL,
    "maintenance_plan_id" BIGINT NOT NULL,
    "asset_id" BIGINT NOT NULL,
    "assigned_at" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "maintenance_plan_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_orders" (
    "id" BIGSERIAL NOT NULL,
    "organization_id" BIGINT NOT NULL,
    "customer_id" BIGINT NOT NULL,
    "company_id" BIGINT NOT NULL,
    "asset_id" BIGINT NOT NULL,
    "maintenance_plan_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "Prioirty" NOT NULL,
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'DRAFT',
    "assigned_to" BIGINT NOT NULL,
    "assigned_crew_id" INTEGER NOT NULL,
    "scheduled_start_date" VARCHAR(50) NOT NULL,
    "scheduled_end_date" VARCHAR(50) NOT NULL,
    "actual_start_date" VARCHAR(50) NOT NULL,
    "actual_end_date" VARCHAR(50) NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "estimated_cost" DECIMAL(10,2) NOT NULL,
    "actual_cost" DECIMAL(10,2) NOT NULL,
    "address" TEXT NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "is_multi_day" SMALLINT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "work_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_services" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "service_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "service_cost" DECIMAL(10,2) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "work_order_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_tasks" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "task_name" VARCHAR(255) NOT NULL,
    "task_description" TEXT NOT NULL,
    "assigned_to" BIGINT NOT NULL,
    "status" "WorkOrderTaskStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "due_date" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "work_order_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_assets" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "asset_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" VARCHAR(50) NOT NULL DEFAULT '',
    "updated_at" VARCHAR(50) NOT NULL DEFAULT '',

    CONSTRAINT "work_order_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_crew" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "crew_id" BIGINT NOT NULL,
    "assigned_at" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "work_order_crew_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_approvals" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "approved_by" BIGINT NOT NULL,
    "approval_status" "ApprovalStatus" NOT NULL,
    "approved_at" VARCHAR(50) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "work_order_approvals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" BIGSERIAL NOT NULL,
    "work_order_id" BIGINT NOT NULL,
    "invoice_number" VARCHAR(50) NOT NULL,
    "invoice_date" VARCHAR(50) NOT NULL,
    "due_date" VARCHAR(50) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" BIGSERIAL NOT NULL,
    "invoice_id" BIGINT NOT NULL,
    "service_id" BIGINT NOT NULL,
    "part_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" BIGSERIAL NOT NULL,
    "invoice_id" BIGINT NOT NULL,
    "payment_date" VARCHAR(50) NOT NULL,
    "payment_amount" DECIMAL(12,2) NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "transaction_id" VARCHAR(100) NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "notification_type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_templates" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "entity_type" "LogType" NOT NULL,
    "entity_id" BIGINT NOT NULL,
    "changes" TEXT NOT NULL,
    "created_at" VARCHAR(50) NOT NULL,
    "updated_at" VARCHAR(50) NOT NULL,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_organization_idx" ON "users"("organization_id");

-- CreateIndex
CREATE INDEX "users_user_idx" ON "user_role_assignments"("user_id");

-- CreateIndex
CREATE INDEX "user_skills_user_idx" ON "user_skills"("user_id");

-- CreateIndex
CREATE INDEX "user_skills_skill_idx" ON "user_skills"("skill_id");

-- CreateIndex
CREATE INDEX "user_skills_organization_idx" ON "user_skills"("organization_id");

-- CreateIndex
CREATE INDEX "business_hours_organization_id_x" ON "business_hours"("organization_id");

-- CreateIndex
CREATE INDEX "holidays_organization_idx" ON "holidays"("orga");

-- CreateIndex
CREATE INDEX "time_off_requests_user_idx" ON "time_off_requests"("user_id");

-- CreateIndex
CREATE INDEX "crews_leader_idx" ON "crews_leader"("leader_id");

-- CreateIndex
CREATE INDEX "crew_members_organization_idx" ON "crew_members"("organization_id");

-- CreateIndex
CREATE INDEX "crew_members_crew_idx" ON "crew_members"("crew_id");

-- CreateIndex
CREATE INDEX "crew_members_user_idx" ON "crew_members"("user_id");

-- CreateIndex
CREATE INDEX "equipments_organization_idx" ON "equipments_organization"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "companies_phone_key" ON "companies"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "companies_email_key" ON "companies"("email");

-- CreateIndex
CREATE INDEX "companies_organization_idx" ON "companies"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_phone_key" ON "customers"("phone");

-- CreateIndex
CREATE INDEX "customers_organization_idx" ON "customers"("organization_id");

-- CreateIndex
CREATE INDEX "customers_user_idx" ON "customers"("user_id");

-- CreateIndex
CREATE INDEX "customers_company_idx" ON "customers"("company_id");

-- CreateIndex
CREATE INDEX "services_organization_idx" ON "services"("organization_id");

-- CreateIndex
CREATE INDEX "service_types_organization_idx" ON "service_types"("organization_id");

-- CreateIndex
CREATE INDEX "assets_organization_idx" ON "assets"("organization_id");

-- CreateIndex
CREATE INDEX "assets_customer_idx" ON "assets"("customer_id");

-- CreateIndex
CREATE INDEX "parts_organization_idx" ON "parts"("organization_id");

-- CreateIndex
CREATE INDEX "maintenance_plans_organization_idx" ON "maintenance_plans"("organization_id");

-- CreateIndex
CREATE INDEX "maintenance_plan_assets_maintenance_plan_idx" ON "maintenance_plan_assets"("maintenance_plan_id");

-- CreateIndex
CREATE INDEX "work_orders_organization_idx" ON "work_orders"("organization_id");

-- CreateIndex
CREATE INDEX "work_orders_company_idx" ON "work_orders"("company_id");

-- CreateIndex
CREATE INDEX "work_orders_customer_idx" ON "work_orders"("customer_id");

-- CreateIndex
CREATE INDEX "work_orders_asset_idx" ON "work_orders"("asset_id");

-- CreateIndex
CREATE INDEX "work_orders_maintenance_plan_idx" ON "work_orders"("maintenance_plan_id");

-- CreateIndex
CREATE INDEX "work_order_services_work_order_idx" ON "work_order_services"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_services_service_idx" ON "work_order_services"("service_id");

-- CreateIndex
CREATE INDEX "work_order_tasks_work_order_idx" ON "work_order_tasks"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_assets_work_order_idx" ON "work_order_assets"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_crew_work_order_idx" ON "work_order_crew"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_crew_crew_idx" ON "work_order_crew"("crew_id");

-- CreateIndex
CREATE INDEX "work_order_approvals_work_order_idx" ON "work_order_approvals"("work_order_id");

-- CreateIndex
CREATE INDEX "invoices_work_order_idx" ON "invoices"("work_order_id");

-- CreateIndex
CREATE INDEX "invoice_items_invoice_idx" ON "invoice_items"("invoice_id");

-- CreateIndex
CREATE INDEX "invoice_items_service_idx" ON "invoice_items"("service_id");

-- CreateIndex
CREATE INDEX "invoice_items_part_idx" ON "invoice_items"("part_id");

-- CreateIndex
CREATE INDEX "payments_invoice_idx" ON "payments"("invoice_id");

-- CreateIndex
CREATE INDEX "notifications_user_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "audit_logs_user_idx" ON "audit_logs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tokens_token_key" ON "tokens"("token");

-- CreateIndex
CREATE INDEX "tokens_user_id_idx" ON "tokens"("user_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_hours" ADD CONSTRAINT "business_hours_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holidays" ADD CONSTRAINT "holidays_orga_fkey" FOREIGN KEY ("orga") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off_requests" ADD CONSTRAINT "time_off_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crews_leader" ADD CONSTRAINT "crews_leader_leader_id_fkey" FOREIGN KEY ("leader_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew_members" ADD CONSTRAINT "crew_members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew_members" ADD CONSTRAINT "crew_members_crew_id_fkey" FOREIGN KEY ("crew_id") REFERENCES "crews_leader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crew_members" ADD CONSTRAINT "crew_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments_organization" ADD CONSTRAINT "equipments_organization_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_types" ADD CONSTRAINT "service_types_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parts" ADD CONSTRAINT "parts_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_plans" ADD CONSTRAINT "maintenance_plans_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_plan_assets" ADD CONSTRAINT "maintenance_plan_assets_maintenance_plan_id_fkey" FOREIGN KEY ("maintenance_plan_id") REFERENCES "maintenance_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_orders" ADD CONSTRAINT "work_orders_maintenance_plan_id_fkey" FOREIGN KEY ("maintenance_plan_id") REFERENCES "maintenance_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_services" ADD CONSTRAINT "work_order_services_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_services" ADD CONSTRAINT "work_order_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_tasks" ADD CONSTRAINT "work_order_tasks_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assets" ADD CONSTRAINT "work_order_assets_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_crew" ADD CONSTRAINT "work_order_crew_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_crew" ADD CONSTRAINT "work_order_crew_crew_id_fkey" FOREIGN KEY ("crew_id") REFERENCES "crews_leader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_approvals" ADD CONSTRAINT "work_order_approvals_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
