-- CreateTable
CREATE TABLE `Airline` (
    `airline_id` INTEGER NOT NULL AUTO_INCREMENT,
    `airline_code` VARCHAR(191) NOT NULL,
    `airline_name` VARCHAR(191) NOT NULL,
    `airplane_id` INTEGER NOT NULL,

    UNIQUE INDEX `Airline_airline_code_key`(`airline_code`),
    PRIMARY KEY (`airline_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Airline` ADD CONSTRAINT `Airline_airplane_id_fkey` FOREIGN KEY (`airplane_id`) REFERENCES `Airplane`(`airplane_id`) ON DELETE CASCADE ON UPDATE CASCADE;
