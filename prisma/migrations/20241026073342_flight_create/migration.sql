-- CreateTable
CREATE TABLE `Flight` (
    `flight_id` INTEGER NOT NULL AUTO_INCREMENT,
    `flight_number` VARCHAR(191) NOT NULL,
    `departure_date` DATETIME(3) NOT NULL,
    `arrival_date` DATETIME(3) NOT NULL,
    `origin_airport` VARCHAR(191) NOT NULL,
    `destination_airport` VARCHAR(191) NOT NULL,
    `airplane_id` INTEGER NOT NULL,
    `airline_id` INTEGER NOT NULL,
    `airport_id` INTEGER NOT NULL,

    UNIQUE INDEX `Flight_flight_number_key`(`flight_number`),
    UNIQUE INDEX `Flight_airplane_id_key`(`airplane_id`),
    PRIMARY KEY (`flight_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airplane_id_fkey` FOREIGN KEY (`airplane_id`) REFERENCES `Airplane`(`airplane_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airline_id_fkey` FOREIGN KEY (`airline_id`) REFERENCES `Airline`(`airline_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Flight` ADD CONSTRAINT `Flight_airport_id_fkey` FOREIGN KEY (`airport_id`) REFERENCES `Airport`(`airport_id`) ON DELETE CASCADE ON UPDATE CASCADE;
