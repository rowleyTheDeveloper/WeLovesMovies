const request = require("supertest");

const app = require("../../src/app");
const db = require("../../src/db/connection");

describe("Movie Routes", () => {
  beforeAll(() => {
    return db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback(null, true))
      .then(() => db.migrate.latest());
  });

  beforeEach(() => {
    return db.seed.run();
  });

  afterAll(async () => {
    return await db.migrate.rollback(null, true).then(() => db.destroy());
  });

  describe("GET /movies", () => {

    test("should not include critics anywhere for the path `/movies/:movieId/critics`", async () => {
      const previous = await db("movies").first();

      const response = await request(app).get(
        `/movies/${previous.movie_id}/critics`
      );
//       console.log('------------------------------')
//       console.log(response.body)
//       console.log('------------------------------')
      expect(response.body.error).toBeDefined();
      expect(response.statusCode).toBe(404);
    });
  });
});
