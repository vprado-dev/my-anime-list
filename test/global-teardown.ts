import knex from "knex";

module.exports = async () => {
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
  } catch (error) {
    console.log(error);
    process.exit(1);
  } finally {
    await testDatabase.destroy();
  }
};
