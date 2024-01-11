import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnUnparkInParkingCompany1704891015202
  implements MigrationInterface
{
  name = 'AddColumnUnparkInParkingCompany1704891015202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD \`unpark\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP COLUMN \`unpark\``,
    );
  }
}
