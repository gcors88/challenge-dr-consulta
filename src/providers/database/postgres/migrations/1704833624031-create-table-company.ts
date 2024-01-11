import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompany1704833624031 implements MigrationInterface {
  name = 'CreateTableCompany1704833624031';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`companies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`cnpj\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`total_car_spaces\` int NOT NULL, \`total_motorcycle_spaces\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_703760d095b8e399e34950f496\` (\`cnpj\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_703760d095b8e399e34950f496\` ON \`companies\``,
    );
    await queryRunner.query(`DROP TABLE \`companies\``);
  }
}
