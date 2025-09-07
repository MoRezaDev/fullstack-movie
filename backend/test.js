import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // fetch all movies
  const movies = await prisma.movie.findMany();

  for (const movie of movies) {
    // try parsing rating string
    const parsed = parseFloat(movie.rating);

    // if it’s a number, update rating_search
    if (!isNaN(parsed)) {
      await prisma.movie.update({
        where: { id: movie.id },
        data: { rating_search: parsed },
      });
    }
  }

  console.log('✅ Ratings updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
