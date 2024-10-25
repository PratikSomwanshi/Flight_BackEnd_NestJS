/*
  Warnings:

  - A unique constraint covering the columns `[airplane_model]` on the table `Airplane` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Airplane_airplane_model_key` ON `Airplane`(`airplane_model`);
