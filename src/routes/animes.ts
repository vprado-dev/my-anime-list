import { Router } from "express";
import { animesPostOne } from "../endpoint/animes";
import { auth } from "../middlewares/auth";
import { body } from "../utils/requestsValidations";
import { animesPostOneBody } from "../validations/animes";

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

export default router;
