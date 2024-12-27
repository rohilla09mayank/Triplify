'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from "@/hooks/use-toast"

interface Day {
  agenda: string
  transportation: {
    required: boolean
    details: string
    price: number
  }
  hotel: {
    required: boolean
    details: string
    price: number
  }
  activities: {
    required: boolean
    details: string
    price: number
  }
  additionalDetails: string
}

export function NewTemplateForm() {
  const [days, setDays] = useState<Day[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const addDay = () => {
    setDays([...days, {
      agenda: '',
      transportation: { required: false, details: '', price: 0 },
      hotel: { required: false, details: '', price: 0 },
      activities: { required: false, details: '', price: 0 },
      additionalDetails: ''
    }])
  }

  const updateDay = (index: number, field: keyof Day, value: any) => {
    const newDays = [...days]
    newDays[index] = { ...newDays[index], [field]: value }
    setDays(newDays)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
    setIsOpen(false)
    toast({
      title: "Template created",
      description: "New template has been successfully created.",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create New Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="templateName">Template Name</Label>
                <Input id="templateName" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" required />
              </div>
              <div>
                <Label htmlFor="imageUpload">Image Upload</Label>
                <Input id="imageUpload" type="file" accept="image/*" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Itinerary</h3>
                {days.map((day, index) => (
                  <div key={index} className="space-y-2 mt-4 p-4 border rounded-md">
                    <h4 className="font-medium">Day {index + 1}</h4>
                    <Textarea
                      placeholder="Agenda for the day"
                      value={day.agenda}
                      onChange={(e) => updateDay(index, 'agenda', e.target.value)}
                    />
                    {['transportation', 'hotel', 'activities'].map((item) => (
                      <div key={item} className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${item}-${index}`}
                            checked={day[item as keyof typeof day].required}
                            onCheckedChange={(checked) =>
                              updateDay(index, item as keyof Day, { ...day[item as keyof Day], required: checked })
                            }
                          />
                          <Label htmlFor={`${item}-${index}`}>{item.charAt(0).toUpperCase() + item.slice(1)} Required</Label>
                        </div>
                        {day[item as keyof typeof day].required && (
                          <>
                            <Input
                              placeholder={`${item.charAt(0).toUpperCase() + item.slice(1)} Details`}
                              value={day[item as keyof typeof day].details}
                              onChange={(e) =>
                                updateDay(index, item as keyof Day, { ...day[item as keyof Day], details: e.target.value })
                              }
                            />
                            <Input
                              type="number"
                              placeholder={`${item.charAt(0).toUpperCase() + item.slice(1)} Price`}
                              value={day[item as keyof typeof day].price}
                              onChange={(e) =>
                                updateDay(index, item as keyof Day, { ...day[item as keyof Day], price: parseFloat(e.target.value) })
                              }
                            />
                          </>
                        )}
                      </div>
                    ))}
                    <Textarea
                      placeholder="Additional Details"
                      value={day.additionalDetails}
                      onChange={(e) => updateDay(index, 'additionalDetails', e.target.value)}
                    />
                  </div>
                ))}
                <Button type="button" onClick={addDay} className="mt-2">Add Day</Button>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit">Save Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

