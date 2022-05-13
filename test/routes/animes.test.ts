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

  describe("401 - Unauthorized", () => {
    test("POST /animes", async () => {
      expect.assertions(1);

      const res = await request.post("/animes").send({
        nome: "Fullmetal Alchemist: Brotherhood",
        sinopse:
          "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life.",
        dataLancamento: "2022-05-09",
      });

      expect(res.status).toBe(401);
    });

    test("PATCH /animes/:animeId", async () => {
      expect.assertions(1);

      const res = await request
        .patch("/animes/1")
        .send({ nome: "Fullmetal Alchemist" });

      expect(res.status).toBe(401);
    });
  });

  describe("404 - Not Found", () => {
    test("GET /animes/:animeId", async () => {
      expect.assertions(1);

      const res = await request.get("/animes/97239");

      expect(res.status).toBe(404);
    });

    test("PATCH /animes/:animeId", async () => {
      expect.assertions(1);

      const res = await request
        .patch("/animes/97239")
        .set(AUTHORIZATION_HEADER)
        .send({ nome: "Fullmetal Alchemist" });

      expect(res.status).toBe(404);
    });
  });

  describe("200 - OK", () => {
    test("GET /animes", async () => {
      expect.assertions(2);

      const res = await request.get("/animes");

      expect(res.status).toBe(200);
      expect(Object.keys(res.body).sort()).toEqual(["items", "totalCount"]);
    });

    test("GET /animes/:animeId", async () => {
      expect.assertions(3);

      const res1 = await request
        .post("/animes")
        .set(AUTHORIZATION_HEADER)
        .send({
          nome: "Fullmetal Alchemist: Brotherhood",
          sinopse:
            "After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life.",
          dataLancamento: "2022-05-09",
        });

      expect(res1.status).toBe(201);

      const res2 = await request.get(`/animes/${res1.body.animeId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);
    });

    test("PATCH /animes/:animeId", async () => {
      expect.assertions(6);

      const res1 = await request
        .post("/animes")
        .set(AUTHORIZATION_HEADER)
        .send({
          nome: "Test anime",
          sinopse:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          dataLancamento: "2022-12-03",
        });

      expect(res1.status).toBe(201);

      const res2 = await request.get(`/animes/${res1.body.animeId}`);

      expect(res2.status).toBe(200);

      expect(res1.body).toEqual(res2.body);

      const res3 = await request
        .patch(`/animes/${res1.body.animeId}`)
        .set(AUTHORIZATION_HEADER)
        .send({ nome: "Anime test" });

      expect(res3.status).toBe(200);
      expect(res3.body).not.toEqual(res2.body);
      expect(res3.body).toEqual({
        ...res2.body,
        nome: "Anime test",
        updatedAt: expect.anything(),
      });
    });
  });
});
