const supertest = require("supertest");
const app = require("../../app");

describe("Post signup user and signin user", () => {
  test("should add user and respond the users obj with token", async () => {
    const respond = await supertest(app)
      .post("/api/v1/auth/signup")
      .send({
        nombre: "julio",
        password: "aaA@23",
        rol_id: "1",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toHaveProperty("token");
  });
  test("signin user", async () => {
    const respond = await supertest(app)
      .post("/api/v1/auth/signin")
      .send({
        nombre: "julio",
        password: "aaA@23",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toHaveProperty("token");
  });
});
