const supertest = require("supertest");
const app = require("../../app");
const { BearerToken } = require("../../constants/project");
describe("Defectuoso", () => {
  test("Get / , should get array", async () => {
    const res = await supertest(app)
      .get("/api/v1/defectuosos")
      .set("authorization", BearerToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
