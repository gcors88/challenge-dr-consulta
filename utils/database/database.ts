import { createConnection, ConnectionConfig } from 'mysql';

const config: ConnectionConfig = {
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  password: process.env.MYSQL_PASSWORD,
};
const connection = createConnection(config);
const database = process.env.MYSQL_DATABASE;

export const createDb = async () => {
  try {
    await connection.connect();
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
    await connection.end();
    console.log('Database created successfully');
  } catch {
    console.log('Database already exists');
  }
};

export const dropDb = async () => {
  await connection.connect();
  await connection.query(`DROP DATABASE ${database};`);
  await connection.end();
  console.log('Database droped successfully');
};
