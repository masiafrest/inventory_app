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
      .field("marca", "uno")
      .field("descripcion", "laptop")
      .field("modelo", "cblack")
      .field("sku", "uno")
      .field("categoria_id", 2)
      .field("qty", 500)
      .field("lugar_id", 1)
      .field("color", "yel")
      .field("precio", 9.99)
      .field("precio_min", 7.99)
      .field("costo", 5.0)
      .field("proveedor", 1)
      // .attach("images", __dirname + "./testimg.png")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("id");
      });
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
        lugar_id: 1,
        precio: {
          id: 2,
          oferta_precio: null,
          proveedor_id: 1,
        },
      })
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toBeInstanceOf(Object);
  });
});
