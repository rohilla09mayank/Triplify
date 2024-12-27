'use client'

import { useState } from 'react'
import { BookingToolbar } from '../components/BookingToolbar'
import { BookingTable } from '../components/BookingTable'
import { BookingDetailsModal } from '../components/BookingDetailsModal'
import { CreateBookingModal } from '../components/CreateBookingModal'
import { Booking } from '../types/booking'
import { ColumnDef } from "@tanstack/react-table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


// Dummy data
const dummyBookings: Booking[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '123-456-7890',
    startDate: '2023-07-01',
    endDate: '2023-07-14',
    destination: 'Paris',
    numberOfPeople: 2,
    packageName: 'European Adventure',
    paymentStatus: 'Done',
    bookingStatus: 'Confirmed',
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '098-765-4321',
    startDate: '2023-08-15',
    endDate: '2023-08-25',
    destination: 'Tokyo',
    numberOfPeople: 3,
    packageName: 'Asian Exploration',
    paymentStatus: 'Pending',
    bookingStatus: 'Pending',
  },
  // Add more dummy bookings as needed
]

const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "id",
    header: "Booking ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
  },
  {
    accessorKey: "endDate",
    header: "End Date",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "numberOfPeople",
    header: "Number of People",
  },
  {
    accessorKey: "packageName",
    header: "Package Name",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
  },
  {
    accessorKey: "bookingStatus",
    header: "Booking Status",
  },
]

export default function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [bookings, setBookings] = useState(dummyBookings)

  const { toast } = useToast()

  const handleRowClick = (booking: Booking) => {
    setSelectedBooking(booking)
  }

  const handleRowDoubleClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsDetailsModalOpen(true)
  }

  const handleEdit = () => {
    // Implement edit functionality
    console.log('Edit booking:', selectedBooking)
  }

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (selectedBooking) {
      setBookings(bookings.filter(booking => booking.id !== selectedBooking.id))
      setIsDeleteDialogOpen(false)
      setSelectedBooking(null)
      toast({
        title: "Booking deleted",
        description: "The booking has been successfully deleted.",
      })
    }
  }

  const handleExport = (type: 'csv' | 'pdf' | 'email' | 'invoice') => {
    // Implement export functionality
    console.log('Export bookings as:', type)
  }

  const filteredBookings = bookings.filter(booking =>
    Object.values(booking).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Bookings</h1>
      <div className="mb-4">
        <CreateBookingModal>
          <Button>Create New Booking</Button>
        </CreateBookingModal>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <BookingToolbar
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleExport}
        isBookingSelected={!!selectedBooking}
      />
      <BookingTable
        columns={columns}
        data={filteredBookings}
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
      />
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onGenerateEmail={() => console.log('Generate email')}
        onGenerateInvoice={() => console.log('Generate invoice')}
        onDownloadPDF={() => console.log('Download PDF')}
      />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              booking and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  )
}

