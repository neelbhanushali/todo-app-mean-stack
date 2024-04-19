const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', require('./src'))
app.get('*', function(req, res){
  res.status(404).send()
});

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
    apis: ["./src/*/*.controller.js"],
  };
const specs = swaggerJsdoc(options);
app.use(
  "/api",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = app
