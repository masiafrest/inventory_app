const supertest = require("supertest");
const app = require("../../app");

describe("Categoria Get", () => {
  it("it should respond with a array", async () => {
    const respond = await supertest(app)
      .get("/api/v1/categorias")
      .expect("content-type", /json/);
    console.log(respond);
    expect(respond.body).toBeInstanceOf(Array);
  });
});
