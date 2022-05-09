import { Knex } from "knex";
import { escapeLike } from "./escapeLike";

interface AnimeFilterProps {
  nome: string;
}
export const createAnimesBulder = (
  database: Knex,
  { nome }: AnimeFilterProps,
) =>
  database.from("animes").modify((builder) => {
    if (nome) {
      builder.andWhereRaw(`lower(nome) like lower(?)`, [
        "%" + escapeLike(`${nome}`) + "%",
      ]);
    }
  });
