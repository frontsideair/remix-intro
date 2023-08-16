import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const db = new PrismaClient();

async function seed() {
  await db.post.deleteMany({});

  const titles = Array.from({ length: 10 }, () =>
    faker.lorem.words({ min: 3, max: 10 })
  );

  for (const title of titles) {
    for (let i = 0; i < faker.number.int({ min: 3, max: 12 }); i++) {
      await db.post.create({
        data: {
          title,
          content: faker.lorem.paragraphs({ min: 1, max: 3 }),
          author: faker.internet.userName().toLocaleLowerCase(),
        },
      });
    }
  }
  return;
}

seed();
