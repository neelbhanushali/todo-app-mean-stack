const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { faker } = require('@faker-js/faker');

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  const uri = '/api/auth/register'
  
  it("Should return 404 for Get", async () => {
    const res = await request(app).get(uri);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Route not found')
  });

  it("User should get created", async () => {
    const obj = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 10})
    }
    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('Registration done')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('email')
    expect(res.body.error[0].msg).toBe('Email already in use')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('first_name')
    expect(res.body.error[0].msg).toBe('First name is required')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('email')
    expect(res.body.error[0].msg).toBe('Email is required')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('email')
    expect(res.body.error[0].msg).toBe('Provide valid email')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('password')
    expect(res.body.error[0].msg).toBe('Password is required')
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
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('password')
    expect(res.body.error[0].msg).toBe('The minimum password length is 6 characters')
  })
});
