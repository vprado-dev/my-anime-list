import { Knex } from "knex";

export const createAnimesBulder = (database: Knex): Knex.QueryBuilder =>
  database.from("animes");
