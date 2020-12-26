const supertest = require("supertest");
const app = require("../../app");

describe("Cheques Get and Post", () => {
  test("Cheque get all", async () => {
    const res = await supertest(app)
      .get("/api/v1/cheques")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
