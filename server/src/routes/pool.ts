import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { authenticate } from "../plugins/authenticate";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get("/pools/count", async () => {
    const count = await prisma.pool.count();

    return { count };
  });

  fastify.post("/pools", async (request, reply) => {
    const poolRequest = z.object({
      title: z.string(),
    });

    const { title } = poolRequest.parse(request.body);
    const code = String(new ShortUniqueId({ length: 6 })()).toUpperCase();

    try {
      await request.jwtVerify();

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          bettors: {
            create: {
              userId: request.user.sub,
            },
          },
        },
      });
    } catch (error) {
      await prisma.pool.create({
        data: {
          title,
          code,
        },
      });
    }

    return reply.status(201).send({ code });
  });

  fastify.post(
    "/pools/:code/join",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const joinPoolRequest = z.object({
        code: z.string(),
      });

      const { code } = joinPoolRequest.parse(request.params);

      const pool = await prisma.pool.findUnique({
        where: {
          code,
        },
        include: {
          bettors: {
            where: {
              userId: request.user.sub,
            },
          },
        },
      });

      if (!pool) {
        return reply.status(404).send({
          message: "Pool not found",
        });
      }

      if (pool.bettors.length > 0) {
        return reply.status(409).send({
          message: "User already joined this pool",
        });
      }

      if (!pool.ownerId) {
        await prisma.pool.update({
          where: {
            id: pool.id,
          },
          data: {
            ownerId: request.user.sub,
          },
        });
      }

      await prisma.bettor.create({
        data: {
          poolId: pool.id,
          userId: request.user.sub,
        },
      });

      return reply.status(201).send();
    }
  );

  fastify.get("/pools", { onRequest: [authenticate] }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        bettors: {
          some: {
            userId: request.user.sub,
          },
        },
      },
      include: {
        _count: {
          select: {
            bettors: true,
          },
        },
        bettors: {
          select: {
            id: true,

            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { pools };
  });

  fastify.get("/pools/:id", { onRequest: [authenticate] }, async (request) => {
    const getPoolsParams = z.object({
      id: z.string(),
    });

    const { id } = getPoolsParams.parse(request.params);

    const pool = await prisma.pool.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            bettors: true,
          },
        },
        bettors: {
          select: {
            id: true,

            user: {
              select: {
                avatarUrl: true,
              },
            },
          },
          take: 4,
        },
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return { pool };
  });
}
