import { Knex } from "knex";
import { database } from "../utils/database";

export const createTransaction =
  (database: Knex) =>
  async <T>(fn: (database: Knex) => Promise<T>): Promise<T> => {
    let x: T | null = null;

    await database.transaction(async (database) => {
      x = await fn(database);
    });

    if (x == null) {
      throw new Error("failed to retrieve value from transaction");
    }

    return x;
  };

export const transaction = createTransaction(database);
