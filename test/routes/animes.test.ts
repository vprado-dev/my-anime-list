import "../fixture";

import { request as req } from "../request";

const AUTHORIZATION_HEADER = {
  authorization: `Bearer ${process.env.API_TOKEN}`,
};

const request = req();

describe("animes", () => {
  describe("400 - Bad Request", () => {
    test("POST /animes", async () => {
      expect.assertions(1);

      const res = await request
        .post("/animes")
        .set(AUTHORIZATION_HEADER)
        .send({});

      expect(res.status).toBe(400);
    });

    test("GET /animes/:animeId", async () => {
      expect.assertions(1);

      const res = await request.get("/animes/invalid");

      expect(res.status).toBe(400);
    });

    test("PATCH /animes/:animeId", async () => {
      expect.assertions(2);

      const res1 = await request
        .patch("/animes/invalid")
        .set(AUTHORIZATION_HEADER)
        .send({ nome: "wizard" });

      const res2 = await request
        .patch("/animes/invalid")
        .set(AUTHORIZATION_HEADER)
        .send({});

      expect(res1.status).toBe(400);
      expect(res2.status).toBe(400);
    });
  });
});
