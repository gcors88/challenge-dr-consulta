import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelatinshipBetweenCompanyAndParkingCompany1704845451188
  implements MigrationInterface
{
  name = 'CreateRelatinshipBetweenCompanyAndParkingCompany1704845451188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD \`company_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` ADD CONSTRAINT \`FK_23cb7deaed415e04f7f44bf5332\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP FOREIGN KEY \`FK_23cb7deaed415e04f7f44bf5332\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`parking_company\` DROP COLUMN \`company_id\``,
    );
  }
}
