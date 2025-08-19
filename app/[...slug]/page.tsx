'use client'
import Link from 'next/link'
import { use } from 'react'

interface PageProps {
  params: Promise<{ slug: string[] }>
}

export default function CatchAllPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const path = resolvedParams.slug.join('/')
  
  if (path.startsWith('flights-to-')) {
    const citySlug = path.replace('flights-to-', '')
    const cityName = citySlug.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ')
    
    return (
      <main className="min-h-screen p-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 block">← Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Cheap Flights to {cityName}</h1>
        
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Flights to {cityName}</h2>
          <button 
            onClick={() => window.open(`https://www.aviasales.com/search?marker=451154`, '_blank')}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Search Flights →
          </button>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About Flights to {cityName}</h2>
          <p>Find the best deals on flights to {cityName}. We search hundreds of airlines and travel sites to bring you the cheapest flights available.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Why Book Flights to {cityName} with Us?</h3>
          <ul className="list-disc pl-6">
            <li>Compare prices from 100+ airlines</li>
            <li>No hidden fees</li>
            <li>24/7 customer support</li>
            <li>Best price guarantee</li>
          </ul>
        </div>
      </main>
    )
  }
  
  return <h1>Page not found: {path}</h1>
}
