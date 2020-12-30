const supertest = require("supertest");
const app = require("../../../app");
const { BearerToken } = require("../../../constants/project");

describe("Rols", () => {
  test("get rols", async () => {
    const res = await supertest(app)
      .get("/api/v1/usuarios/roles")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  test("post rols", async () => {
    const res = await supertest(app)
      .post("/api/v1/usuarios/roles")
      .send({
        tipo: "admin",
      })
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toHaveProperty("tipo");
    expect(res.body.tipo).toBe("admin");
    expect(res.body).toHaveProperty("id");
  });
});
