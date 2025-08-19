import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const cities = [
  { name: 'London', country: 'United Kingdom', countryCode: 'GB', iataCode: 'LON', population: 9000000 },
  { name: 'Paris', country: 'France', countryCode: 'FR', iataCode: 'PAR', population: 2200000 },
  { name: 'New York', country: 'United States', countryCode: 'US', iataCode: 'NYC', population: 8300000 },
  { name: 'Tokyo', country: 'Japan', countryCode: 'JP', iataCode: 'TYO', population: 14000000 },
  { name: 'Dubai', country: 'UAE', countryCode: 'AE', iataCode: 'DXB', population: 3400000 },
  { name: 'Singapore', country: 'Singapore', countryCode: 'SG', iataCode: 'SIN', population: 5700000 },
]

async function main() {
  for (const city of cities) {
    await prisma.city.create({
      data: {
        ...city,
        slug: city.name.toLowerCase().replace(' ', '-'),
        description: `Find cheap flights to ${city.name}. Compare prices from hundreds of airlines.`,
        metaDescription: `Book flights to ${city.name}, ${city.country}. Best deals on airfare to ${city.iataCode}.`,
      }
    })
  }
  console.log('Seeded cities:', cities.length)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
