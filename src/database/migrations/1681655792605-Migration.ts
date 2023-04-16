import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1681655792605 implements MigrationInterface {
  name = 'Migration1681655792605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NOT NULL, \`loginIdentifier\` varchar(255) NOT NULL, \`hashedPassword\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_801b399465c3912a6cf3e6d71c\` (\`loginIdentifier\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_801b399465c3912a6cf3e6d71c\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
