import { INestApplication } from '@nestjs/common';

import { Database } from '@/providers/database/postgres/database';
import { appModule as appTestingModule } from './support/app.module';
import { cleanDatabase } from '@test/support/helpers/clean-database';

let appModule: INestApplication;

const database = new Database();

beforeAll(async () => {
  await database.createConnection();
  appModule = await appTestingModule();
});

afterEach(async () => {
  try {
    await cleanDatabase(appModule);
  } catch (error) {
    console.error('Setup - BeforeEach Error', error);
  }
});

afterAll(async () => {
  await cleanDatabase(appModule);
  await database.closeConnection();
  await appModule.close();
});
