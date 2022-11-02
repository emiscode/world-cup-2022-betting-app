import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "User Test",
      email: "user.test@gmail.com",
      avatarUrl:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-128.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Pool Test",
      code: "PT1",
      ownerId: user.id,

      bettors: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  const match = await prisma.match.create({
    data: {
      date: "2022-11-20T19:00:00.000Z",
      teamOneCountryCode: "QA",
      teamTwoCountryCode: "EC",
    },
  });
}

main();
