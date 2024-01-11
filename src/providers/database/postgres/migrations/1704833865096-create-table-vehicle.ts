import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVehicle1704833865096 implements MigrationInterface {
  name = 'CreateTableVehicle1704833865096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`brand\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`license_plate\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_7e9fab2e8625b63613f67bd706\` (\`license_plate\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_7e9fab2e8625b63613f67bd706\` ON \`vehicles\``,
    );
    await queryRunner.query(`DROP TABLE \`vehicles\``);
  }
}
