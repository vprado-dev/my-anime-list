import Joi from "joi";

export const animesPostOneBody = Joi.object()
  .keys({
    nome: Joi.string().required(),
    sinopse: Joi.string().required(),
    referenciaExterna: Joi.string(),
    dataLancamento: Joi.date().iso().required(),
  })
  .required();

export const animesGetManyQuery = Joi.object()
  .keys({
    nome: Joi.string(),
  })
  .required();

export const animesGetOneParams = Joi.object()
  .keys({
    animeId: Joi.number().integer().required(),
  })
  .required();

export const animesPatchOneBody = Joi.object()
  .keys({
    nome: Joi.string(),
    sinopse: Joi.string(),
    referenciaExterna: Joi.string().allow(null),
    dataLancamento: Joi.date().iso(),
  })
  .required();
