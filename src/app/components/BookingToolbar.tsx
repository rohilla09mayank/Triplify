'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'

interface BookingToolbarProps {
  onEdit: () => void
  onDelete: () => void
  onExport: (type: 'csv' | 'pdf' | 'email' | 'invoice') => void
  isBookingSelected: boolean
}

export function BookingToolbar({ onEdit, onDelete, onExport, isBookingSelected }: BookingToolbarProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <Button onClick={onEdit} disabled={!isBookingSelected}>
        Edit Booking
      </Button>
      <Button onClick={onDelete} disabled={!isBookingSelected} variant="destructive">
        Delete Booking
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Select Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Booking ID</DropdownMenuItem>
          <DropdownMenuItem>Customer Name</DropdownMenuItem>
          <DropdownMenuItem>Start Date</DropdownMenuItem>
          <DropdownMenuItem>End Date</DropdownMenuItem>
          <DropdownMenuItem>Destination</DropdownMenuItem>
          <DropdownMenuItem>Number of People</DropdownMenuItem>
          <DropdownMenuItem>Package Name</DropdownMenuItem>
          <DropdownMenuItem>Payment Status</DropdownMenuItem>
          <DropdownMenuItem>Booking Status</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Export <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onExport('csv')}>CSV</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('pdf')}>PDF</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('email')}>Email</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('invoice')}>Invoice</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

