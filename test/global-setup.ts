import knex from "knex";
import path from "path";
import "./fixture";

const MIGRATIONS_PATH = path.join(__dirname, "..", "database", "migrations");

const createTestDatabase = async () => {
  const testDatabase = knex({
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: "postgres",
    },
    pool: {
      min: 2,
      max: 20,
    },
  });

  try {
    await testDatabase.raw(
      `DROP DATABASE IF EXISTS "test-${process.env.POSTGRES_DB}"`,
    );
    await testDatabase.raw(`CREATE DATABASE "test-${process.env.POSTGRES_DB}"`);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await testDatabase.destroy();
  }
};

// Seed the testDatabase with schema and data
const seedTestDatabase = async () => {
  const testDatabase = knex({
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: `test-${process.env.POSTGRES_DB}`,
    },
    migrations: {
      directory: MIGRATIONS_PATH,
    },
    pool: {
      min: 2,
      max: 20,
    },
  });

  try {
    await testDatabase.migrate.latest();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await testDatabase.destroy();
  }
};

module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log("Test database created successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
