import Joi from "joi";

export const animesPostOneBody = Joi.object()
  .keys({
    nome: Joi.string().required(),
    sinopse: Joi.string().required(),
    referenciaExterna: Joi.string(),
    dataLancamento: Joi.date().iso().required(),
  })
  .required();
