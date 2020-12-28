const supertest = require("supertest");
const app = require("../../app");
const { BearerToken } = require("../../constants/project");

describe("Items", () => {
  it("GET it should respond with a array", async () => {
    const respond = await supertest(app)
      .get("/api/v1/items")
      .set("authorization", BearerToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toBeInstanceOf(Array);
  });
  test("POST should respond with a id", async () => {
    const respond = await supertest(app)
      .post("/api/v1/items")
      .send({
        nombre: "uno",
        descripcion: "laptop",
        modelo: "cblack",
        barcode: "111111",
        sku: "dos-yel",
        categoria_id: 2,
        qty: 500,
        lugar_id: 1,
        color: "yel",
        precio: 190.9,
        precio_min: 1.99,
        costo: 0.9,
        proveedor_id: 1,
      })
      .set("authorization", BearerToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toHaveProperty("id");
  });
  it("GET/:name it should respond with the item that has the name", async () => {
    const respond = await supertest(app)
      .get("/api/v1/items/sony")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toBeInstanceOf(Object);
  });
  it("Patch ", async () => {
    const respond = await supertest(app)
      .get("/api/v1/items/sony")
      .send({
        id: 3,
        descripcion: "new descripcion2",
        inventarios: [
          {
            id: 3,
            lugar_id: 1,
            precio: {
              id: 2,
              oferta_precio: null,
              proveedor_id: 1,
            },
          },
        ],
      })
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toBeInstanceOf(Object);
  });
});
