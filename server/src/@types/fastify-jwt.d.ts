import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: {
      name: string;
      sub: string;
      avatarUrl: string;
    };
  }
}
