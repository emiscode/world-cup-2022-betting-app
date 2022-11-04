import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function authRoutes(fastify: FastifyInstance) {
  const URL_API_OAUTH2 = "https://www.googleapis.com/oauth2/v2/userinfo";
  fastify.post("/users", async (request) => {
    const createUserRequest = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserRequest.parse(request.body);

    const userResponse = await fetch(URL_API_OAUTH2, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    return { userInfo };
  });
}
