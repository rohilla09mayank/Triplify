'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"


interface Customer {
  name: string
  phoneNumber: string
  email: string
  address: string
  country: string
  notes: string
}

export function CreateCustomerModal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    country: '',
    notes: ''
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomer(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Validate form fields
    if (!customer.name || !customer.email || !customer.phoneNumber) {
      toast({
        title: "Error",
        description: "Name, email, and phone number are required fields. Please fill them out.",
        variant: "destructive"
      })
      return
    }
    // Handle form submission here (e.g., send data to API)
    console.log('Customer submitted:', customer)
    setIsOpen(false)
    toast({
      title: "Customer Created",
      description: `New customer ${customer.name} has been successfully added to the system.`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="block mb-1">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={customer.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter customer name" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber" className="block mb-1">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={customer.phoneNumber} 
                  onChange={handleInputChange} 
                  placeholder="Enter phone number" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email" className="block mb-1">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={customer.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter email address" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="address" className="block mb-1">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={customer.address} 
                  onChange={handleInputChange} 
                  placeholder="Enter address" 
                />
              </div>
              <div>
                <Label htmlFor="country" className="block mb-1">Country</Label>
                <Input 
                  id="country" 
                  name="country" 
                  value={customer.country} 
                  onChange={handleInputChange} 
                  placeholder="Enter country" 
                />
              </div>
              <div>
                <Label htmlFor="notes" className="block mb-1">Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes" 
                  value={customer.notes} 
                  onChange={handleInputChange} 
                  placeholder="Enter any additional notes" 
                />
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Create Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

