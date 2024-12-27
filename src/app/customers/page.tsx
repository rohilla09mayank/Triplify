'use client'

import { useState } from 'react'
import { CustomerTable } from '../components/CustomerTable'
import { CustomerDetailsModal } from '../components/CustomerDetailsModal'
import { Customer } from '../types/customer'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Dummy data
const dummyCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    bookings: ['Booking 1', 'Booking 2'],
    notes: ['Prefers window seats'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    address: '456 Elm St, Othertown, USA',
    bookings: ['Booking 3'],
    notes: ['Allergic to peanuts'],
  },
  // Add more dummy customers as needed
]

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "id",
    header: "Customer ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "bookings",
    header: "Number of Bookings",
    cell: ({ row }) => row.original.bookings.length,
  },
]

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(dummyCustomers)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const { toast } = useToast()

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  const handleRowDoubleClick = (customer: Customer) => {
    setSelectedCustomer(customer)
    setIsDetailsModalOpen(true)
  }

  const handleSaveCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c))
    toast({
      title: "Customer updated",
      description: "Customer information has been successfully updated.",
    })
  }

  const handleNewCustomer = () => {
    const newCustomer: Customer = {
      id: (customers.length + 1).toString(),
      name: '',
      email: '',
      phone: '',
      address: '',
      bookings: [],
      notes: [],
    }
    setSelectedCustomer(newCustomer)
    setIsDetailsModalOpen(true)
    toast({
      title: "New customer",
      description: "New customer form has been opened.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Button onClick={handleNewCustomer}>New Customer</Button>
      </div>
      <CustomerTable
        columns={columns}
        data={customers}
        onRowClick={handleRowClick}
        onRowDoubleClick={handleRowDoubleClick}
      />
      <CustomerDetailsModal
        customer={selectedCustomer}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onSave={handleSaveCustomer}
      />
      <Toaster />
    </div>
  )
}

