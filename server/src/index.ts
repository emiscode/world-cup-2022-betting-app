import * as dotenv from "dotenv";
import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: __dirname + "/.env" });

const port = Number(process.env.PORT) || 3333;

const prisma = new PrismaClient({
  log: ["query"],
});

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  await fastify.listen({ port });
}

bootstrap();
