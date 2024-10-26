/*
  Warnings:

  - You are about to drop the column `airplane_id` on the `airline` table. All the data in the column will be lost.
  - Added the required column `airline_id` to the `Airplane` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `airline` DROP FOREIGN KEY `Airline_airplane_id_fkey`;

-- AlterTable
ALTER TABLE `airline` DROP COLUMN `airplane_id`;

-- AlterTable
ALTER TABLE `airplane` ADD COLUMN `airline_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Airplane` ADD CONSTRAINT `Airplane_airline_id_fkey` FOREIGN KEY (`airline_id`) REFERENCES `Airline`(`airline_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
