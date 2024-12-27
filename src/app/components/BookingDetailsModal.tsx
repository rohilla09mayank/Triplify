import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Booking } from "../types/booking"

interface BookingDetailsModalProps {
  booking: Booking | null
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
  onGenerateEmail: () => void
  onGenerateInvoice: () => void
  onDownloadPDF: () => void
}

export function BookingDetailsModal({
  booking,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onGenerateEmail,
  onGenerateInvoice,
  onDownloadPDF
}: BookingDetailsModalProps) {
  if (!booking) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
          <DialogDescription>
            Booking ID: {booking.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p>Name: {booking.customerName}</p>
            <p>Email: {booking.customerEmail}</p>
            <p>Phone: {booking.customerPhone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Trip Details</h3>
            <p>Package: {booking.packageName}</p>
            <p>Destination: {booking.destination}</p>
            <p>Start Date: {booking.startDate}</p>
            <p>End Date: {booking.endDate}</p>
            <p>Number of People: {booking.numberOfPeople}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>Booking Status: {booking.bookingStatus}</p>
            <p>Payment Status: {booking.paymentStatus}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button onClick={onEdit}>Edit Booking</Button>
          <Button onClick={onDelete} variant="destructive">Delete Booking</Button>
          <Button onClick={onGenerateEmail} variant="outline">Generate Email</Button>
          <Button onClick={onGenerateInvoice} variant="outline">Generate Invoice</Button>
          <Button onClick={onDownloadPDF} variant="outline">Download PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

