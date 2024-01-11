import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';

import { Connection } from './interfaces/connection';
import { typeOrmConnectionSource } from './orm-config';

@Injectable()
export class Database implements Connection {
  public getRepository<T>(model: EntityTarget<T>): Repository<T> {
    return typeOrmConnectionSource.getRepository(model);
  }

  public async createConnection(): Promise<DataSource> {
    return typeOrmConnectionSource.initialize();
  }

  public async closeConnection(): Promise<void> {
    return typeOrmConnectionSource.destroy();
  }

  public getConnection(): DataSource {
    return typeOrmConnectionSource;
  }
}
