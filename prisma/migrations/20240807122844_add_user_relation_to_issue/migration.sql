-- AlterTable
ALTER TABLE `issues` ADD COLUMN `userId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
