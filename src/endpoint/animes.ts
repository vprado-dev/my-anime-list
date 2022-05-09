import { endpoint } from "../functions/endpoint";
import { transaction } from "../functions/transaction";

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
