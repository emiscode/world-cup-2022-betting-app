import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "User Test",
      email: "test.user@gmail.com",
      avatarUrl:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Pool Test",
      code: "PT01",
      ownerId: user.id,

      bettors: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.match.create({
    data: {
      date: "2022-11-20T19:00:00.000Z",
      teamOneCountryCode: "QAT",
      teamTwoCountryCode: "ECU",
    },
  });

  await prisma.match.create({
    data: {
      date: "2022-11-21T16:00:00.000Z",
      teamOneCountryCode: "ENG",
      teamTwoCountryCode: "IRN",

      bets: {
        create: {
          teamOneScores: 2,
          teamTwoScores: 0,

          bettor: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
