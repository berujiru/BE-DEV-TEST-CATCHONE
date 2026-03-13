import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

export const getDb = async () => {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
};