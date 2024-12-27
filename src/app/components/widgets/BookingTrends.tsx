'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function BookingTrends() {
  const [filter, setFilter] = useState<'week' | 'month'>('week')

  // This would typically fetch data from an API
  const weekData = [
    { name: 'Mon', Pending: 4, Confirmed: 3, Completed: 2 },
    { name: 'Tue', Pending: 3, Confirmed: 5, Completed: 1 },
    { name: 'Wed', Pending: 2, Confirmed: 4, Completed: 3 },
    { name: 'Thu', Pending: 5, Confirmed: 2, Completed: 4 },
    { name: 'Fri', Pending: 3, Confirmed: 3, Completed: 2 },
    { name: 'Sat', Pending: 6, Confirmed: 4, Completed: 3 },
    { name: 'Sun', Pending: 4, Confirmed: 3, Completed: 1 },
  ]

  const monthData = [
    { name: 'Week 1', Pending: 20, Confirmed: 15, Completed: 10 },
    { name: 'Week 2', Pending: 15, Confirmed: 20, Completed: 12 },
    { name: 'Week 3', Pending: 25, Confirmed: 18, Completed: 15 },
    { name: 'Week 4', Pending: 18, Confirmed: 22, Completed: 20 },
  ]

  const data = filter === 'week' ? weekData : monthData

  return (
    <Card className="col-span-full md:col-span-6 md:row-span-2 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Booking Trends</CardTitle>
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilter('week')}
            className={filter === 'week' ? 'bg-primary text-primary-foreground' : ''}
          >
            Week
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilter('month')}
            className={filter === 'month' ? 'bg-primary text-primary-foreground' : ''}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Pending" fill="#8884d8" />
              <Bar dataKey="Confirmed" fill="#82ca9d" />
              <Bar dataKey="Completed" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

