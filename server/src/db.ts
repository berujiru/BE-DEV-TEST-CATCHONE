import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config();

export const getDb = async () => {
  return open({
    // Fallback to default if ENV is missing
    filename: process.env.DATABASE_PATH || './database.sqlite',
    driver: sqlite3.Database
  });
};