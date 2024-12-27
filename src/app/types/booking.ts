export interface Booking {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  startDate: string
  endDate: string
  destination: string
  numberOfPeople: number
  packageName: string
  paymentStatus: 'Done' | 'Pending'
  bookingStatus: 'Confirmed' | 'Pending' | 'Completed'
}

