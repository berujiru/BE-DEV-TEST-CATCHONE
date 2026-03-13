import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
dotenv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupDatabase() {
  const db = await open({
    filename: process.env.DATABASE_PATH || './database.sqlite',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      gender TEXT,
      ip_address TEXT,
      company TEXT,
      city TEXT,
      title TEXT,
      website TEXT
    )
  `);

  return db;
}

export async function importCSV() {
  const db = await setupDatabase();
  // This path should now work correctly with the ESM __dirname fix
  const csvFilePath = path.resolve(__dirname, '../../data/customers.csv');

  console.log('🚀 Starting import from:', csvFilePath);
  
  const rows: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => rows.push(data))
    .on('end', async () => {
      await db.run('BEGIN TRANSACTION');
      const stmt = await db.prepare(`
        INSERT OR REPLACE INTO customers (id, first_name, last_name, email, gender, ip_address, company, city, title, website)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const row of rows) {
        await stmt.run([
          row.id, 
          row.first_name, 
          row.last_name, 
          row.email, 
          row.gender, 
          row.ip_address, 
          row.company, 
          row.city, 
          row.title, 
          row.website
        ]);
      }

      await stmt.finalize();
      await db.run('COMMIT');
      console.log(`✅ Successfully imported ${rows.length} customers.`);
      process.exit(0);
    });
}

// ESM-friendly way to check if file is run directly
if (process.argv[1] === __filename) {
  importCSV().catch(console.error);
}