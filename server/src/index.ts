import * as dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: __dirname + "/.env" });

const port = Number(process.env.PORT) || 3333;
const host = String(process.env.HOST) || "0.0.0.0";

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  await fastify.listen({ port, host });
}

bootstrap();
