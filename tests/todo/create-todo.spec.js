const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { faker } = require('@faker-js/faker');

require("dotenv").config();

const UserModel = require('../../src/models/user')

beforeEach(async () => {
  await mongoose.connect(process.env.DB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('POST /api/todo', () => {
  const registrationUri = '/api/auth/register'
  const uri = '/api/todo'

  it('Validation Error : title is required', async () => {
    const obj = {
      user: new mongoose.Types.ObjectId()
    }

    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('title')
    expect(res.body.error[0].msg).toBe('Title is required')
  })

  it('Validation Error : user is required', async () => {
    const obj = {
      title: faker.lorem.sentence(),
    }

    const res = await request(app).post(uri).send(obj)
    expect(res.statusCode).toBe(422)
    expect(res.body.message).toBe('Validation Error')
    expect(res.body.error.length).toBe(1)
    expect(res.body.error[0].path).toBe('user')
    expect(res.body.error[0].msg).toBe('User id is required')
  })

  it('Todo should get created', async () => {
    const obj0 = {
      first_name: faker.person.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password({length: 10})
    }
    const res0 = await request(app).post(registrationUri).send(obj0)

    const obj = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      user: res0.body.data._id
    }

    const res = await request(app).post(uri).send(obj)

    expect(res.statusCode).toBe(200)
    expect(res.body.message).toBe('Success')
  })
})