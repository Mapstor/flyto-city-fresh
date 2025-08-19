import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const cities = [
  { name: 'London', country: 'UK', countryCode: 'GB', code: 'LON', airport: 'LHR' },
  { name: 'Paris', country: 'France', countryCode: 'FR', code: 'PAR', airport: 'CDG' },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', code: 'TYO', airport: 'NRT' },
  { name: 'Dubai', country: 'UAE', countryCode: 'AE', code: 'DXB', airport: 'DXB' },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', code: 'SIN', airport: 'SIN' },
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
