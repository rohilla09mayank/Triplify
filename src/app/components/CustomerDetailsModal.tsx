import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Customer } from "../types/customer"

interface CustomerDetailsModalProps {
  customer: Customer | null
  isOpen: boolean
  onClose: () => void
  onSave: (customer: Customer) => void
}

export function CustomerDetailsModal({
  customer,
  isOpen,
  onClose,
  onSave
}: CustomerDetailsModalProps) {
  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(customer)
  const [note, setNote] = useState('')

  if (!customer) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedCustomer(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSave = () => {
    if (editedCustomer) {
      onSave(editedCustomer)
    }
    onClose()
  }

  const handleAddNote = () => {
    if (editedCustomer) {
      const updatedNotes = [...(editedCustomer.notes || []), note]
      setEditedCustomer({ ...editedCustomer, notes: updatedNotes })
      setNote('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer Details</DialogTitle>
          <DialogDescription>
            Customer ID: {customer.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedCustomer?.name || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={editedCustomer?.email || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={editedCustomer?.phone || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={editedCustomer?.address || ''}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="bookings">Bookings</Label>
            <ul className="mt-2 space-y-2">
              {customer.bookings.map((booking, index) => (
                <li key={index}>{booking}</li>
              ))}
            </ul>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <ul className="mt-2 space-y-2">
              {editedCustomer?.notes?.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
            <div className="flex mt-2">
              <Textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-grow"
              />
              <Button onClick={handleAddNote} className="ml-2">Add Note</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

