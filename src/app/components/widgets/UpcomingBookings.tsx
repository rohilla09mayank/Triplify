import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function UpcomingBookings() {
  // This would typically fetch data from an API
  const upcomingBookings = [
    { id: 1, customerName: 'John Doe', destination: 'Paris', startDate: '2023-07-15', paymentStatus: 'Paid' },
    { id: 2, customerName: 'Jane Smith', destination: 'Tokyo', startDate: '2023-07-20', paymentStatus: 'Pending' },
    { id: 3, customerName: 'Bob Johnson', destination: 'New York', startDate: '2023-07-25', paymentStatus: 'Paid' },
  ]

  return (
    <Card className="col-span-full md:col-span-6 md:row-span-1">
      <CardHeader>
        <CardTitle>Upcoming Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {upcomingBookings.map(booking => (
            <li key={booking.id} className="text-sm">
              {booking.customerName} - {booking.destination} - {booking.startDate} - {booking.paymentStatus}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

