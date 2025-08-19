'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface City {
  id: string;
  name: string;
  country: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/cities')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        console.log('API Response:', data); // Debug log
        // Handle if data is wrapped in an object
        const citiesData = Array.isArray(data) ? data : data.cities || [];
        setCities(citiesData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cities:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading cities...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  if (cities.length === 0) return <div className="flex justify-center items-center min-h-screen">No cities found. Run: npx tsx scripts/add-cities.ts</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Find Cheap Flights to Any City</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map(city => (
          <div 
            key={city.id}
            onClick={() => router.push(`/flights-to-${city.slug}`)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{city.name}</h2>
            <p className="text-gray-600">{city.country}</p>
            {city.description && <p className="mt-2 text-sm">{city.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
