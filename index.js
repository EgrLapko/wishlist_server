const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./src/schema/schema");
const connectDB = require("./src/config/db");

const port = process.env.PORT || 5000;

const app = express();

require("dotenv").config();

connectDB();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({ schema, graphiql: process.env.NODE_ENV === "development" })
);

app.listen(port, console.log("Server runs"));
