const server = require("../index.js");
const request = require("supertest");

describe("Operaciones CRUD", () => {
  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/hora").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it("login", async () => {
    const username = "usertest";
    const password = "test123";
    const result = await request(server)
      .post("/login")
      .send({ username, password });

    expect(result.statusCode).toBe(200);
  });

  it("Registrando un usuario", async () => {

    const newUser = { username : "testuserNEW2", password: "123123", user_id: 10, role: "user"}

    await request(server).post("/register").send(newUser);

    const allusers = await request(server).get("/users").send()

    expect(allusers.body).toContainEqual(newUser);
  });
});
