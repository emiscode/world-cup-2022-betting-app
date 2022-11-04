import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { authenticate } from "../plugins/authenticate";

export async function betRoutes(fastify: FastifyInstance) {
  fastify.get("/bets/count", async () => {
    const count = await prisma.bet.count();

    return { count };
  });

  fastify.post(
    "/pools/:poolId/match/:matchId/bet",
    { onRequest: [authenticate] },
    async (request, reply) => {
      const createBetRequest = z.object({
        poolId: z.string(),
        matchId: z.string(),
      });

      const createBetBody = z.object({
        teamOneScores: z.number(),
        teamTwoScores: z.number(),
      });

      const { poolId, matchId } = createBetRequest.parse(request.params);
      const { teamOneScores, teamTwoScores } = createBetBody.parse(
        request.body
      );

      const bettor = await prisma.bettor.findUnique({
        where: {
          userId_poolId: {
            poolId,
            userId: request.user.sub,
          },
        },
      });

      if (!bettor) {
        return reply.status(403).send({
          message: "User cannot create a bet for this pool",
        });
      }

      const bets = await prisma.bet.findUnique({
        where: {
          bettorId_matchId: {
            bettorId: bettor.id,
            matchId,
          },
        },
      });

      if (bets) {
        return reply.status(409).send({
          message: "User already bet on this match for this pool",
        });
      }

      const match = await prisma.match.findUnique({
        where: {
          id: matchId,
        },
      });

      if (!match) {
        return reply.status(404).send({
          message: "Match not found!",
        });
      }

      if (match.date < new Date()) {
        return reply.status(409).send({
          message: "This match is finished!",
        });
      }

      await prisma.bet.create({
        data: {
          matchId,
          bettorId: bettor.id,
          teamOneScores,
          teamTwoScores,
        },
      });

      return reply.status(201).send();
    }
  );
}
