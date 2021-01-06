const supertest = require("supertest");
const app = require("../../app");

describe("Get and Post proveedores", () => {
  test("Get all Proveedores", async () => {
    const res = await supertest(app)
      .get("/api/v1/proveedores")
      .expect(200)
      .expect("Content-type", /json/);
    expect(res.body).toBeInstanceOf(Array);
  });
  test("Post One proveedor", async () => {
    const res = await supertest(app)
      .post("/api/v1/Proveedores")
      .send({
        nombre: "vietnam",
        direccion: "calle vietnam",
        telefono: "555-555555",
      })
      .expect(200)
      .expect("Content-type", /json/);
    expect(res.body).toHaveProperty("id");
  });
});
