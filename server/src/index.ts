import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import { expressjwt } from "express-jwt";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import schema from "./graphql";
import connectDB from "./db/connectDB";
import context from "./context/context";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 4000;

const auth = expressjwt({
  secret: process.env.JWT_SECRET!,
  credentialsRequired: false,
  algorithms: ["HS256"],
});

const start = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  await connectDB();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({ origin: 'http://localhost:3000', credentials: true }),
    express.json(),
    express.urlencoded({ extended: false }),
    auth,
    expressMiddleware(server, {
      context,
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
};

start();
