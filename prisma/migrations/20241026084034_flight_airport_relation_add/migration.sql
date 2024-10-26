/*
  Warnings:

  - You are about to drop the column `airport_id` on the `flight` table. All the data in the column will be lost.
  - You are about to alter the column `origin_airport` on the `flight` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `destination_airport` on the `flight` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `flight` DROP FOREIGN KEY `Flight_airport_id_fkey`;

-- AlterTable
ALTER TABLE `flight` DROP COLUMN `airport_id`,
    MODIFY `origin_airport` INTEGER NOT NULL,
    MODIFY `destination_airport` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_origin_airport_fkey` FOREIGN KEY (`origin_airport`) REFERENCES `Airport`(`airport_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_destination_airport_fkey` FOREIGN KEY (`destination_airport`) REFERENCES `Airport`(`airport_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
