import express from "express";
import {expressMiddleware} from "@apollo/server/express4"
import { ApolloServer } from "@apollo/server";
import cors from "cors"
import cookieParser from "cookie-parser"
import schema from "./schema";
import createContext from "./context";

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
    expressMiddleware(server, {
      context: ({req, res}) => createContext({req, res}) // added the context here and this is the relationship
    })
  )

  app.listen(4000, () => {
    console.log("Server is running on http://localhost:4000/graphql");
  });
}

startServer();
