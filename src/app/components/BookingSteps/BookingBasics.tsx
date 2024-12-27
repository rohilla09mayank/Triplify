import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Booking } from '../CreateBookingModal'

interface BookingBasicsProps {
  booking: Booking
  updateBooking: (data: Partial<Booking>) => void
  onNext: () => void
  onCancel: () => void
}

export function BookingBasics({ booking, updateBooking, onNext, onCancel }: BookingBasicsProps) {
  const handleCustomerTypeChange = (value: 'existing' | 'new') => {
    updateBooking({ customer: { ...booking.customer, type: value } })
  }

  const handleTemplateTypeChange = (value: 'existing' | 'new') => {
    updateBooking({ template: { ...booking.template, type: value } })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Customer</Label>
        <RadioGroup
          defaultValue={booking.customer.type}
          onValueChange={handleCustomerTypeChange}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="existing" id="existing-customer" />
            <Label htmlFor="existing-customer">Select Existing Customer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new-customer" />
            <Label htmlFor="new-customer">New Customer</Label>
          </div>
        </RadioGroup>
      </div>

      {booking.customer.type === 'existing' ? (
        <Select onValueChange={(value) => updateBooking({ customer: { ...booking.customer, id: value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">John Doe</SelectItem>
            <SelectItem value="2">Jane Smith</SelectItem>
            {/* Add more customers here */}
          </SelectContent>
        </Select>
      ) : (
        <>
          <Input
            placeholder="Customer Name"
            value={booking.customer.name || ''}
            onChange={(e) => updateBooking({ customer: { ...booking.customer, name: e.target.value } })}
          />
          <Input
            placeholder="Contact Number"
            value={booking.customer.contactNumber || ''}
            onChange={(e) => updateBooking({ customer: { ...booking.customer, contactNumber: e.target.value } })}
          />
        </>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={booking.startDate}
            onChange={(e) => updateBooking({ startDate: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={booking.endDate}
            onChange={(e) => updateBooking({ endDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="numberOfPeople">Number of People</Label>
        <Input
          id="numberOfPeople"
          type="number"
          min="1"
          value={booking.numberOfPeople}
          onChange={(e) => updateBooking({ numberOfPeople: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <Label>Template</Label>
        <RadioGroup
          defaultValue={booking.template.type}
          onValueChange={handleTemplateTypeChange}
          className="flex space-x-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="existing" id="existing-template" />
            <Label htmlFor="existing-template">Select Existing Template</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="new-template" />
            <Label htmlFor="new-template">Create New Template</Label>
          </div>
        </RadioGroup>
      </div>

      {booking.template.type === 'existing' && (
        <Select onValueChange={(value) => updateBooking({ template: { ...booking.template, id: value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">European Adventure</SelectItem>
            <SelectItem value="2">Asian Exploration</SelectItem>
            <SelectItem value="3">African Safari</SelectItem>
          </SelectContent>
        </Select>
      )}

      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  )
}

