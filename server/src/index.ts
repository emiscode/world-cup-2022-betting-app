import * as dotenv from "dotenv";
import { z } from "zod";
import Fastify, { FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";

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

  fastify.post("/pools", async (req, res) => {
    const poolRequest = z.object({
      title: z.string(),
    });

    const { title } = poolRequest.parse(req.body);
    const code = String(new ShortUniqueId({ length: 6 })()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code,
      },
    });

    return res.status(201).send({ code });
  });

  await fastify.listen({ port /* host */ });
}

bootstrap();
