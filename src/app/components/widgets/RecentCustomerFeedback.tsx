import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function RecentCustomerFeedback() {
  // This would typically fetch data from an API
  const recentFeedback = [
    { id: 1, customer: 'John Doe', comment: 'Excellent service! Will definitely book again.' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customer Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {recentFeedback.map(feedback => (
          <div key={feedback.id}>
            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
            <p className="mt-1 text-sm font-medium">- {feedback.customer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

