import { endpoint } from "../functions/endpoint";
import { transaction } from "../functions/transaction";
import { database } from "../utils/database";
import { createAnimesBulder } from "../functions/createAnimesBuilder";
import { HttpError } from "../utils/httpError";
import { escapeLike } from "../functions/escapeLike";

interface AnimeProps {
  animeId: number;
  nome: string;
  sinopse: string;
  referenciaExterna: string;
  dataLancamento: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const animesPostOne = endpoint(async (req, res) => {
  const {
    body: { ...body },
  } = req;

  const anime = await transaction<AnimeProps>(async (database) => {
    const [item] = await database
      .from("animes")
      .insert({ ...body })
      .returning("*");

    return item;
  });

  res.status(201).json(anime);
});

export const animesGetMany = endpoint(async (req, res) => {
  const { nome, $limit, $offset } = req.query as any;

  const animes = await createAnimesBulder(database).modify((builder) => {
    if (nome) {
      builder.andWhereRaw(`lower(nome) like lower(?)`, [
        "%" + escapeLike(`${nome}`) + "%",
      ]);
    }
    builder.limit($limit);
    builder.offset($offset);
  });
  const totalCount = await createAnimesBulder(database).count("*").first();

  res.status(200).json({ totalCount: Number(totalCount.count), items: animes });
});

export const animesGetOne = endpoint(async (req, res) => {
  const { animeId } = req.params;

  const anime = await database.from("animes").where({ animeId }).first();
  if (!anime) {
    throw new HttpError(404, `Anime não encontrado`);
  }

  res.status(200).json(anime);
});

export const animesPatchOne = endpoint(async (req, res) => {
  const { animeId } = req.params;

  const animeExists: AnimeProps = await database
    .from("animes")
    .where({ animeId })
    .first();
  if (!animeExists) {
    throw new HttpError(404, `Anime não encontrado`);
  }

  const {
    body: { ...body },
  } = req;
  const animeUpdated = await transaction<AnimeProps>(async (database) => {
    const now = new Date();

    const [animeT]: AnimeProps[] | undefined = await database
      .from("animes")
      .where({ animeId: animeExists.animeId })
      .update({ ...body, updatedAt: now })
      .returning("*");
    if (!animeT) {
      throw new Error("Não foi possível atualizar o anime");
    }

    return animeT;
  });

  res.status(200).json(animeUpdated);
});
