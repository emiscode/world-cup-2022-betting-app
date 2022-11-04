import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

import { authenticate } from "../plugins/authenticate";

export async function matchRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/pools/:id/match",
    { onRequest: [authenticate] },
    async (request) => {
      const getPoolsParams = z.object({
        id: z.string(),
      });

      const { id } = getPoolsParams.parse(request.params);

      const matchList = await prisma.match.findMany({
        orderBy: {
          date: "desc",
        },
        include: {
          bets: {
            where: {
              bettor: {
                userId: request.user.sub,
                poolId: id,
              },
            },
          },
        },
      });

      return {
        match: matchList.map((game) => {
          return {
            ...game,
            guess: game.bets.length > 0 ? game.bets[0] : null,
            guesses: undefined,
          };
        }),
      };
    }
  );
}
