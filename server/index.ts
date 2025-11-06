import express from "express";
import {expressMiddleware} from "@apollo/server/express4"
import { ApolloServer } from "@apollo/server";
import cors from "cors"
import cookieParser from "cookie-parser"
import schema from "./schema";

const app = express();

const server = new ApolloServer({
  schema
})

async function startServer() {
  await server.start();

  // base setup
  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server)
  )

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

startServer();
