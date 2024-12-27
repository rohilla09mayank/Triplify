'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CustomerGrowth() {
  const [filter, setFilter] = useState<'week' | 'month'>('week')

  // This would typically fetch data from an API
  const newCustomersThisWeek = 10
  const newCustomersThisMonth = 50

  const newCustomers = filter === 'week' ? newCustomersThisWeek : newCustomersThisMonth

  return (
    <Card className="col-span-full md:col-span-4 md:row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Customer Growth</CardTitle>
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
        <div className="space-y-2">
          <p>
            <span className="text-2xl font-bold">{newCustomers}</span>
            <span className="text-muted-foreground ml-2">new customers this {filter}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

