/*
  Warnings:

  - A unique constraint covering the columns `[referal_code]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `referal_code` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `verify_code` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "ProviderCompanyType" AS ENUM ('Bonus', 'Product');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referal_code" TEXT NOT NULL,
ADD COLUMN     "referer_id" TEXT,
ADD COLUMN     "verify_code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProviderCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProviderCompanyType" NOT NULL,

    CONSTRAINT "ProviderCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ProviderCompanyType" NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "provider_company_id" TEXT NOT NULL,
    "provider_product_input_fields_config_id" INTEGER NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "ProviderProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderProductInputFieldsConfig" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "provider_product_input_fields_config_questions_id" INTEGER NOT NULL,

    CONSTRAINT "ProviderProductInputFieldsConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProviderProductInputFieldsConfigQuestions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,

    CONSTRAINT "ProviderProductInputFieldsConfigQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "users_input" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BonusProgramm" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "BonusProgramm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderProduct_provider_product_input_fields_config_id_key" ON "ProviderProduct"("provider_product_input_fields_config_id");

-- CreateIndex
CREATE UNIQUE INDEX "ProviderProductInputFieldsConfig_provider_product_input_fie_key" ON "ProviderProductInputFieldsConfig"("provider_product_input_fields_config_questions_id");

-- CreateIndex
CREATE UNIQUE INDEX "BonusProgramm_user_id_key" ON "BonusProgramm"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_referal_code_key" ON "User"("referal_code");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referer_id_fkey" FOREIGN KEY ("referer_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProduct" ADD CONSTRAINT "ProviderProduct_provider_company_id_fkey" FOREIGN KEY ("provider_company_id") REFERENCES "ProviderCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProduct" ADD CONSTRAINT "ProviderProduct_provider_product_input_fields_config_id_fkey" FOREIGN KEY ("provider_product_input_fields_config_id") REFERENCES "ProviderProductInputFieldsConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProduct" ADD CONSTRAINT "ProviderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProviderProductInputFieldsConfig" ADD CONSTRAINT "ProviderProductInputFieldsConfig_provider_product_input_fi_fkey" FOREIGN KEY ("provider_product_input_fields_config_questions_id") REFERENCES "ProviderProductInputFieldsConfigQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BonusProgramm" ADD CONSTRAINT "BonusProgramm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
