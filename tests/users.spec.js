const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { faker } = require('@faker-js/faker');

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/users/register", () => {
  const uri = '/api/users/register'
  
  it("Should return 404 for Get", async () => {
    const res = await request(app).get(uri);
    expect(res.statusCode).toBe(404);
  });

  it("User should get created", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 10})
    }
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(200)
  })

  it("Should return 422 for same email", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 10})
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })

  it("Validation error : firstname is required", async () => {
    const obj = {
      first_name: null,
      email: faker.internet.email(),
      password: faker.internet.password({length: 10})
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })

  it("Validation error : email is required", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: null,
      password: faker.internet.password({length: 10})
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })

  it("Validation error : email is required", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.person.firstName(),
      password: faker.internet.password({length: 10})
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })

  it("Validation error : password is required", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: null
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })

  it("Validation error : password length minimum 6", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 4})
    }
    await request(app).post(uri).send(obj)
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
  })
});
