import { Button } from "@/components/ui/button"
import { Booking } from '../CreateBookingModal'
import { CreateTemplateModal } from '../CreateTemplateModal'
import { useState } from 'react'

interface BookingItineraryProps {
  booking: Booking
  updateBooking: (data: Partial<Booking>) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
}

export function BookingItinerary({ booking, updateBooking, onNext, onBack, onCancel }: BookingItineraryProps) {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

  const handleTemplateCreated = (template: any) => {
    updateBooking({ itinerary: template })
    setIsTemplateModalOpen(false)
  }

  return (
    <div className="space-y-4">
      {booking.template.type === 'existing' ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Itinerary Details</h3>
          {/* Display itinerary details here */}
          <p>Itinerary details for the selected template will be displayed here.</p>
          {/* Add editable fields for itinerary details */}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2">Create New Template</h3>
          <Button onClick={() => setIsTemplateModalOpen(true)}>Open Template Creator</Button>
          <CreateTemplateModal
            isOpen={isTemplateModalOpen}
            onClose={() => setIsTemplateModalOpen(false)}
            onSave={handleTemplateCreated}
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

