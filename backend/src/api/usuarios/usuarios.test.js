const supertest = require("supertest");
const app = require("../../app");
const { BearerToken } = require("../../constants/project");

let token;

describe("Usuario test", () => {
  test("return all users", async () => {
    const res = await supertest(app)
      .get("/api/v1/usuarios")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });
  test("return users by id", async () => {
    const res = await supertest(app)
      .get("/api/v1/usuarios/1")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body.id).toBe(1);
  });
  test("return users by name", async () => {
    const res = await supertest(app)
      .get("/api/v1/usuarios/sonia")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body.nombre).toBe("sonia");
  });
  test("should add new User by the admin jefa", async () => {
    const respond = await supertest(app)
      .post("/api/v1/usuarios/addUser")
      .send({
        nombre: "sonia2",
        password: "aaA@23",
        rol_id: "1",
      })
      .set("authorization", BearerToken)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body).toHaveProperty("token");
  });
  test("path telefono of user", async () => {
    const respond = await supertest(app)
      .patch("/api/v1/usuarios/1")
      .send({
        telefono: "555-555",
      })
      .set("Accept", "application/json")
      .set("authorization", BearerToken)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(respond.body.telefono).toBe("555-555");
  });
});
