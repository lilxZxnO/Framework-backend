-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_restaurant_id_fkey`;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `Employee_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
