import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserModel } from '../../../../modules/users/entities/user.entity';

export class CreateDefaultUser1704906002479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.connection.getRepository(UserModel);
    await userRepository.save({
      password: '$2b$10$4vQc8DUJY4xc/J/umJwvX.rbXjfPs4n1SM5qtUhAmax7Y5GLKLOuu',
      isActive: true,
      isPasswordChange: true,
      name: process.env.USER_NAME_DEFAULT,
      email: process.env.USER_EMAIL_DEFAULT,
      roles: process.env.USER_ROLES_DEFAULT,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM USERS WHERE email = "${process.env.USER_EMAIL_DEFAULT}"`,
    );
  }
}
