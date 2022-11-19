import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

const dbOptions = {
  user: PG_USER,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
};

export const dbClient = new Client(dbOptions);
