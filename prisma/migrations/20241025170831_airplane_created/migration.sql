-- CreateTable
CREATE TABLE `Airplane` (
    `airplane_id` INTEGER NOT NULL AUTO_INCREMENT,
    `airplane_model` VARCHAR(191) NOT NULL,
    `airplane_capacity` INTEGER NOT NULL,

    PRIMARY KEY (`airplane_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
