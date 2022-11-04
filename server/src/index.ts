import * as dotenv from "dotenv";
import Fastify from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { matchRoutes } from "./routes/match";

import { betRoutes } from "./routes/bet";
import { authRoutes } from "./routes/auth";

dotenv.config({ path: __dirname + "/.env" });

const port = Number(process.env.PORT) || 3333;
const host = String(process.env.HOST) || "0.0.0.0";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  await fastify.register(jwt, {
    secret: process.env.JWT_SECRET || "BETCOPA2022",
  });

  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);
  await fastify.register(matchRoutes);
  await fastify.register(betRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({ port /* host */ });
}

bootstrap();
