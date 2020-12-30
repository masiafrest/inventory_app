const supertest = require("supertest");
const app = require("../../app");
const { BearerToken } = require("../../constants/project");

describe("Clientes", () => {
  test("get clientes", async () => {
    const res = await supertest(app)
      .get("/api/v1/clientes")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  test("post rols", async () => {
    const res = await supertest(app)
      .post("/api/v1/clientes")
      .send({
        nombre: "julio22",
        telefono: "555-555",
        direccion: "1",
      })
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toHaveProperty("nombre");
    expect(res.body.nombre).toBe("julio22");
    expect(res.body).toHaveProperty("id");
  });
});
