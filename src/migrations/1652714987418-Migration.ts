import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1652714987418 implements MigrationInterface {
  name = 'Migration1652714987418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
