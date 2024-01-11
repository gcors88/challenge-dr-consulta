import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableParkingCompany1704845138304
  implements MigrationInterface
{
  name = 'CreateTableParkingCompany1704845138304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`parking_company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`parked\` tinyint NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`parking_company\``);
  }
}
