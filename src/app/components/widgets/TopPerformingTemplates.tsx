import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TopPerformingTemplates() {
  // This would typically fetch data from an API
  const topTemplates = [
    { id: 1, name: 'European Adventure', bookings: 15 },
    { id: 2, name: 'Asian Exploration', bookings: 12 },
    { id: 3, name: 'African Safari', bookings: 10 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {topTemplates.map(template => (
            <li key={template.id} className="mb-2">
              <span className="font-medium">{template.name}</span>
              <span className="ml-2 text-sm text-muted-foreground">({template.bookings} bookings)</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

