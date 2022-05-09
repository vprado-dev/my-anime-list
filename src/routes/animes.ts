import { Router } from "express";
import {
  animesGetMany,
  animesGetOne,
  animesPatchOne,
  animesPostOne,
} from "../endpoint/animes";
import { auth } from "../middlewares/auth";
import { body, params, query } from "../utils/requestsValidations";
import {
  animesGetManyQuery,
  animesGetOneParams,
  animesPatchOneBody,
  animesPostOneBody,
} from "../validations/animes";

const router = Router();

/**
 * POST /animes
 * @tag Animes
 * @security BearerAuth
 * @bodyContent {AnimePostBody} application/json
 * @response 201
 * @responseContent {Anime} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/animes", auth, body(animesPostOneBody), animesPostOne);

/**
 * GET /animes
 * @tag Animes
 * @security BearerAuth
 * @response 200
 * @queryParam {integer} [$limit]
 * @queryParam {integer} [$offset]
 * @queryParam {string} [nome]
 * @responseContent {AnimeListagem} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/animes", auth, query(animesGetManyQuery), animesGetMany);

/**
 * GET /animes/{animeId}
 * @tag Animes
 * @security BearerAuth
 * @pathParam {integer} animeId
 * @response 200
 * @responseContent {Anime} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/animes/:animeId", auth, params(animesGetOneParams), animesGetOne);

/**
 * PATCH /animes/{animeId}
 * @tag Animes
 * @security BearerAuth
 * @pathParam {integer} animeId
 * @bodyContent {AnimePatchBody} application/json
 * @response 200
 * @responseContent {Anime} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.patch(
  "/animes/:animeId",
  auth,
  params(animesGetOneParams),
  body(animesPatchOneBody),
  animesPatchOne,
);

export default router;
