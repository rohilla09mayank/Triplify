import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MostPopularDestination() {
  // This would typically fetch data from an API
  const popularDestination = "Bali"

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardHeader>
        <CardTitle>Most Popular Destination</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{popularDestination}</p>
      </CardContent>
    </Card>
  )
}

