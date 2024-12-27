import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Booking } from '../CreateBookingModal'

interface BookingAccommodationProps {
  booking: Booking
  updateBooking: (data: Partial<Booking>) => void
  onSave: () => void
  onBack: () => void
  onCancel: () => void
}

export function BookingAccommodation({ booking, updateBooking, onSave, onBack, onCancel }: BookingAccommodationProps) {
  const [totalOccupancy, setTotalOccupancy] = useState(0)

  useEffect(() => {
    const newTotalOccupancy = booking.accommodation.rooms.reduce((sum, room) => sum + room.occupancy, 0)
    setTotalOccupancy(newTotalOccupancy)
  }, [booking.accommodation.rooms])

  const handleNumberOfRoomsChange = (value: number) => {
    const newRooms = Array(value).fill(null).map((_, index) => 
      booking.accommodation.rooms[index] || { type: 'Single', occupancy: 1 }
    )
    updateBooking({ 
      accommodation: { 
        ...booking.accommodation, 
        numberOfRooms: value, 
        rooms: newRooms 
      } 
    })
  }

  const handleRoomChange = (index: number, field: 'type' | 'occupancy', value: string | number) => {
    const newRooms = [...booking.accommodation.rooms]
    newRooms[index] = { ...newRooms[index], [field]: value }
    updateBooking({ accommodation: { ...booking.accommodation, rooms: newRooms } })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="numberOfRooms">Number of Rooms Required</Label>
        <Input
          id="numberOfRooms"
          type="number"
          min="1"
          value={booking.accommodation.numberOfRooms}
          onChange={(e) => handleNumberOfRoomsChange(parseInt(e.target.value))}
        />
      </div>

      {booking.accommodation.rooms.map((room, index) => (
        <div key={index} className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`roomType-${index}`}>Room Type</Label>
            <Select
              value={room.type}
              onValueChange={(value) => handleRoomChange(index, 'type', value)}
            >
              <SelectTrigger id={`roomType-${index}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Single">Single</SelectItem>
                <SelectItem value="Double">Double</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`occupancy-${index}`}>Occupancy</Label>
            <Input
              id={`occupancy-${index}`}
              type="number"
              min="1"
              value={room.occupancy}
              onChange={(e) => handleRoomChange(index, 'occupancy', parseInt(e.target.value))}
            />
          </div>
        </div>
      ))}

      {totalOccupancy !== booking.numberOfPeople && (
        <div className="text-red-500 mt-2">
          Warning: Total occupancy ({totalOccupancy}) does not match the number of people ({booking.numberOfPeople}).
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onSave}>Save Booking</Button>
      </div>
    </div>
  )
}

