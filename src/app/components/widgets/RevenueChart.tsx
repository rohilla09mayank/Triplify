'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export function RevenueChart() {
  const [filter, setFilter] = useState<'week' | 'month'>('week')

  // This would typically fetch data from an API
  const weekData = [
    { name: 'Mon', revenue: 1000 },
    { name: 'Tue', revenue: 1500 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 1800 },
    { name: 'Fri', revenue: 2200 },
    { name: 'Sat', revenue: 2500 },
    { name: 'Sun', revenue: 2100 },
  ]

  const monthData = [
    { name: 'Week 1', revenue: 10000 },
    { name: 'Week 2', revenue: 12000 },
    { name: 'Week 3', revenue: 15000 },
    { name: 'Week 4', revenue: 13000 },
  ]

  const data = filter === 'week' ? weekData : monthData

  return (
    <Card className="col-span-full md:col-span-6 md:row-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Revenue Trends</CardTitle>
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

