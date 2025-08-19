import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cities = [
  { name: 'London', country: 'UK', code: 'LON', airport: 'LHR' },
  { name: 'Paris', country: 'France', code: 'PAR', airport: 'CDG' },
  { name: 'Tokyo', country: 'Japan', code: 'TYO', airport: 'NRT' },
  { name: 'Dubai', country: 'UAE', code: 'DXB', airport: 'DXB' },
  { name: 'Singapore', country: 'Singapore', code: 'SIN', airport: 'SIN' },
];

async function main() {
  for (const city of cities) {
    await prisma.city.create({
      data: {
        ...city,
        slug: city.name.toLowerCase(),
        description: `Find cheap flights to ${city.name}`,
        imageUrl: `https://source.unsplash.com/800x600/?${city.name}`,
      },
    });
    console.log(`Added ${city.name}`);
  }
}

main();
