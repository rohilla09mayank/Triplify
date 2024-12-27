'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ProfitMade() {
  const [filter, setFilter] = useState<'week' | 'month'>('week')

  // This would typically fetch data from an API
  const profit = filter === 'week' ? 5000 : 20000

  return (
    <Card className="col-span-full md:col-span-5 md:row-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profit Made</CardTitle>
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
        <div className="text-2xl font-bold">${profit.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">
          +20.1% from last {filter}
        </p>
      </CardContent>
    </Card>
  )
}

