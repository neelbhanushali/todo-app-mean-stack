const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// mongoose
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, {
  serverSelectionTimeoutMS: 5000
});

const conn = mongoose.connection
conn.on('connected', () => console.log('db connected'));
conn.on('open', () => console.log('connection open'));
conn.on('disconnected', () => console.log('db disconnected'));
conn.on('reconnected', () => console.log('db reconnected'));
conn.on('disconnecting', () => console.log('db disconnecting'));
conn.on('close', () => console.log('connection close'));

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', require('./app'))

const options = {
    definition: {
      openapi: "3.1.0",
      // info: {
    //     title: "LogRocket Express API with Swagger",
    //     version: "0.1.0",
    //     description:
    //       "This is a simple CRUD API application made with Express and documented with Swagger",
    //     license: {
    //       name: "MIT",
    //       url: "https://spdx.org/licenses/MIT.html",
    //     },
    //     contact: {
    //       name: "LogRocket",
    //       url: "https://logrocket.com",
    //       email: "info@email.com",
    //     },
    //   },
      // servers: [
      //   {
      //     url: "/",
      //   }
      // ],
    },
    apis: ["./app/*/*.controller.js"],
  };
const specs = swaggerJsdoc(options);
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
