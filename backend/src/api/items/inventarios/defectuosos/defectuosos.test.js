const supertest = require("supertest");
const app = require("../../../../app");
const { test } = require("../../../../lib/yupSchema");

describe("Defectuoso", () => {
  test("Get / , should get array", async () => {
    const res = supertest(app).get("/api/v1/items/inventarios/defectuosos");
  });
});
