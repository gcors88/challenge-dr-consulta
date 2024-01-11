import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelatinshipBetweenVehicleAndParkingCompany1704845366673
  implements MigrationInterface
{
  name = 'CreateRelatinshipBetweenVehicleAndParkingCompany1704845366673';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD \`vehicle_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD CONSTRAINT \`FK_19d54aaa28d05ed79d893b33c97\` FOREIGN KEY (\`vehicle_id\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP FOREIGN KEY \`FK_19d54aaa28d05ed79d893b33c97\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP COLUMN \`vehicle_id\``,
    );
  }
}
