const request = require("supertest");
const server = require("./server");
const games = require("./games");

describe("server.js", () => {
  describe("GET routes", () => {
    it("should return a status code of 200 OK", async () => {
      const expected = 200;
      const response = await request(server).get("/");
      expect(response.status).toEqual(expected);
    });

    it("should return the list of games, or an empty array if the games list is empty.", async () => {
      const expected = games;
      const response = await request(server).get("/");
      expect(response.body).toEqual(expected);
    });
  });

  describe("POST routes", () => {
    it("should return a status code of 201 OK", async () => {
      const expected = 201;
      const newGame = {
        title: "Starcraft",
        genre: "Strategy",
        releaseYear: "1994"
      };
      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.status).toEqual(expected);
    });

    it("should return a 422 status code if either title or genre aren't put in", async () => {
      const expected = 422;
      const newGame = {
        title: "Halo",
        releaseYear: 1993
      };
      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.status).toEqual(expected);
    });

    it("should return a status code of 405 if the game title is not unique", async () => {
      const expected = 405;
      const newGame = {
        title: "Mario",
        genre: "Platformer",
        releaseYear: 1994
      };
      const response = await request(server)
        .post("/games")
        .send(newGame);
      expect(response.status).toEqual(expected);
    });
  });

  describe("GET/:id routes", () => {
    it("should return a status code of 200 if the game is found", async () => {
      const expected = 200;
      const response = await request(server).get("/games/1");
      expect(response.status).toEqual(expected);
    });

    it("should return a status code of 404 if the game is not found", async () => {
      const expected = 404;
      const response = await request(server).get("/games/15");
      expect(response.status).toEqual(expected);
    });
  });

  describe("DELETE routes", () => {
    it("should return a 404 status code if the game id cannot be found", async () => {
      const expected = 404;
      const response = await request(server).delete("/games/15");
      expect(response.status).toEqual(expected);
    });

    it("should return a status code of 200 if the game can be deleted", async () => {
      const expected = 200;
      const response = await request(server).get("/games/1");
      expect(response.status).toEqual(expected);
    });
  });
});
