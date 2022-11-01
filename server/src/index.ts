import * as dotenv from "dotenv";
import Fastify from "fastify";

dotenv.config({ path: __dirname + "/.env" });

const port = Number(process.env.PORT) || 3333;

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  fastify.get("/bets/count", () => {
    return { count: 10 };
  });

  await fastify.listen({ port });
}

bootstrap();
