'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookingBasics } from './BookingSteps/BookingBasics'
import { BookingItinerary } from './BookingSteps/BookingItinerary'
import { BookingAccommodation } from './BookingSteps/BookingAccommodation'

interface Booking {
  customer: {
    type: 'existing' | 'new'
    id?: string
    name?: string
    contactNumber?: string
  }
  startDate: string
  endDate: string
  numberOfPeople: string
  template: {
    type: 'existing' | 'new'
    id?: string
  }
  itinerary?: any
  accommodation: {
    numberOfRooms: string
    rooms: {
      type: string
      occupancy: string
    }[]
  }
}

export function CreateBookingModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState<Booking>({
    customer: { type: 'existing' },
    startDate: '',
    endDate: '',
    numberOfPeople: '',
    template: { type: 'existing' },
    accommodation: {
      numberOfRooms: '',
      rooms: []
    }
  })
  const { toast } = useToast()

  const handleNext = () => {
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSave = () => {
    // Implement save logic here
    console.log('Booking saved:', booking)
    setIsOpen(false)
    toast({
      title: "Booking Created Successfully",
      description: `New booking created for ${booking.customer.name || 'customer'} from ${booking.startDate} to ${booking.endDate}.`,
    })
  }

  const updateBooking = (data: Partial<Booking>) => {
    setBooking(prev => ({ ...prev, ...data }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
        </DialogHeader>
        <Progress value={(currentStep / 3) * 100} className="w-full" />
        <ScrollArea className="h-[70vh] mt-4">
          <div className="pr-4">
            {currentStep === 1 && (
              <BookingBasics 
                booking={booking} 
                updateBooking={updateBooking} 
                onNext={handleNext} 
                onCancel={() => setIsOpen(false)} 
              />
            )}
            {currentStep === 2 && (
              <BookingItinerary 
                booking={booking} 
                updateBooking={updateBooking} 
                onNext={handleNext} 
                onBack={handleBack} 
                onCancel={() => setIsOpen(false)} 
              />
            )}
            {currentStep === 3 && (
              <BookingAccommodation 
                booking={booking} 
                updateBooking={updateBooking} 
                onSave={handleSave} 
                onBack={handleBack} 
                onCancel={() => setIsOpen(false)} 
              />
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

