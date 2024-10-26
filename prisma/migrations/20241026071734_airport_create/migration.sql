-- CreateTable
CREATE TABLE `Airport` (
    `airport_id` INTEGER NOT NULL AUTO_INCREMENT,
    `airport_code` VARCHAR(191) NOT NULL,
    `airport_name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Airport_airport_code_key`(`airport_code`),
    PRIMARY KEY (`airport_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
