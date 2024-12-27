import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TrendingDestinations() {
  // This would typically fetch data from an API
  const destinations = [
    { name: 'Paris', bookings: 150 },
    { name: 'Tokyo', bookings: 120 },
    { name: 'New York', bookings: 100 },
  ]

  return (
    <Card className="col-span-full md:col-span-6 md:row-span-1">
      <CardHeader>
        <CardTitle>Trending Destinations</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {destinations.map((destination, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{destination.name}</span>
              <span className="text-muted-foreground">{destination.bookings} bookings</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

