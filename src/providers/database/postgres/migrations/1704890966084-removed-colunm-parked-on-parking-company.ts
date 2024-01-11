import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedColunmParkedOnParkingCompany1704890966084
  implements MigrationInterface
{
  name = 'RemovedColunmParkedOnParkingCompany1704890966084';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP COLUMN \`parked\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD \`parked\` tinyint NOT NULL`,
    );
  }
}
