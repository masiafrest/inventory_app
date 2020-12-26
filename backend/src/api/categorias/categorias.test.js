const supertest = require("supertest");
const app = require("../../app");

describe("Categoria ", () => {
  it("it should respond with a array", async () => {
    const respond = await supertest(app)
      .get("/api/v1/categorias")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toBeInstanceOf(Array);
  });
  test("should respond with a property of id", async () => {
    const respond = await supertest(app)
      .post("/api/v1/categorias")
      .send({ nombre: "coverss" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toHaveProperty("id");
  });
});
