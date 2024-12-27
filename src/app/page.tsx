import { CreateBookingModal } from './components/CreateBookingModal'
import { CreateCustomerModal } from './components/CreateCustomerModal'
import { CreateTemplateModal } from './components/CreateTemplateModal'
import { ProfitMade } from './components/widgets/ProfitMade'
import { BookingTrends } from './components/widgets/BookingTrends'
import { UpcomingBookings } from './components/widgets/UpcomingBookings'
import { TrendingDestinations } from './components/widgets/TrendingDestinations'
import { CustomerGrowth } from './components/widgets/CustomerGrowth'
import { RevenueChart } from './components/widgets/RevenueChart'
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="py-6">
      <div className="grid gap-6 grid-cols-12">
        <div className="col-span-full md:col-span-3 flex flex-col justify-between">
          <CreateBookingModal>
            <Button className="w-full py-3 text-sm">New Booking</Button>
          </CreateBookingModal>
          <CreateCustomerModal>
            <Button className="w-full py-3 text-sm">New Customer</Button>
          </CreateCustomerModal>
          <CreateTemplateModal>
            <Button className="w-full py-3 text-sm">New Template</Button>
          </CreateTemplateModal>
        </div>
        <ProfitMade />
        <CustomerGrowth />
        <UpcomingBookings />
        <TrendingDestinations />
        <RevenueChart />
        <BookingTrends />
      </div>
      <Toaster />
    </main>
  )
}

