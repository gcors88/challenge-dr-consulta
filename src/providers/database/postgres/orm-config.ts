import { DataSource } from 'typeorm';

import { isDevelopmentEnvironment } from '../../../commons/helpers/is-development-environment';

export const typeOrmConnectionSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  port: Number(process.env.MYSQL_PORT),
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + '/../../../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsRun: !isDevelopmentEnvironment(),
});
