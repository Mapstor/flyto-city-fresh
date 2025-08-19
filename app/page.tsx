'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface City {
  id: string
  name: string
  country: string
  iataCode: string
  slug: string
  description: string
}

export default function Home() {
  const router = useRouter()
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="min-h-screen p-8">Loading cities...</div>

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Find Cheap Flights to Any City</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map(city => (
          <div
            key={city.id}
            onClick={() => router.push(`/flights-to-${city.slug}`)}
            className="border rounded-lg p-6 hover:shadow-lg cursor-pointer transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              Flights to {city.name}
            </h2>
            <p className="text-gray-600 mb-2">{city.country}</p>
            <p className="text-sm text-gray-500">{city.description}</p>
            <span className="inline-block mt-3 text-blue-600 hover:underline">
              Search flights →
            </span>
          </div>
        ))}
      </div>
    </main>
  )
}
