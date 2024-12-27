'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { PlusCircle, MinusCircle } from 'lucide-react'

interface Day {
  title: string
  agenda: string
  transportation: {
    required: boolean
    mode: string
    costToCompany: string
    costToClient: string
  }
  hotel: {
    required: boolean
    name: string
    rooms: {
      type: string
      occupancy: string
      costToCompany: string
      costToClient: string
    }[]
  }
  activities: {
    required: boolean
    sightseeing: string
    paidActivities: string
    sightseeingCostToCompany: string
    sightseeingCostToClient: string
    paidActivitiesCostToCompany: string
    paidActivitiesCostToClient: string
  }
  inclusions: string
  notes: string
}

interface Template {
  name: string
  description: string
  image: File | null
  itinerary: Day[]
}

export function CreateTemplateModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [template, setTemplate] = useState<Template>({
    name: '',
    description: '',
    image: null,
    itinerary: [{ 
      title: '', 
      agenda: '',
      transportation: { required: false, mode: '', costToCompany: '', costToClient: '' },
      hotel: { required: false, name: '', rooms: [] },
      activities: { 
        required: false, 
        sightseeing: '', 
        paidActivities: '', 
        sightseeingCostToCompany: '', 
        sightseeingCostToClient: '',
        paidActivitiesCostToCompany: '',
        paidActivitiesCostToClient: ''
      },
      inclusions: '',
      notes: ''
    }]
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplate(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTemplate(prev => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleDayChange = (index: number, field: keyof Day, value: any) => {
    setTemplate(prev => {
      const newItinerary = [...prev.itinerary]
      newItinerary[index] = { ...newItinerary[index], [field]: value }
      return { ...prev, itinerary: newItinerary }
    })
  }

  const addDay = () => {
    setTemplate(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        title: '', 
        agenda: '',
        transportation: { required: false, mode: '', costToCompany: '', costToClient: '' },
        hotel: { required: false, name: '', rooms: [] },
        activities: { 
          required: false, 
          sightseeing: '', 
          paidActivities: '', 
          sightseeingCostToCompany: '', 
          sightseeingCostToClient: '',
          paidActivitiesCostToCompany: '',
          paidActivitiesCostToClient: ''
        },
        inclusions: '',
        notes: ''
      }]
    }))
  }

  const removeDay = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Validate form fields
    if (!template.name) {
      toast({
        title: "Error",
        description: "Template name is required. Please provide a name for the template.",
        variant: "destructive"
      })
      return
    }
    // Handle form submission here (e.g., send data to API)
    console.log('Template submitted:', template)
    onClose()
    toast({
      title: "Template Created",
      description: `New template "${template.name}" has been successfully created with ${template.itinerary.length} day(s) in the itinerary.`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="block mb-1">Template Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={template.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter Template Name" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="description" className="block mb-1">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={template.description} 
                  onChange={handleInputChange} 
                  placeholder="Enter a brief description of the template" 
                />
              </div>
              <div>
                <Label htmlFor="image" className="block mb-1">Image Upload</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Itinerary</h3>
                {template.itinerary.map((day, index) => (
                  <div key={index} className="space-y-2 mt-4 p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Day {index + 1}</h4>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeDay(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor={`day-${index}-title`} className="block mb-1">Day Title</Label>
                      <Input
                        id={`day-${index}-title`}
                        placeholder={`Day ${index + 1} - Title`}
                        value={day.title}
                        onChange={(e) => handleDayChange(index, 'title', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`day-${index}-agenda`} className="block mb-1">Agenda</Label>
                      <Textarea
                        id={`day-${index}-agenda`}
                        placeholder="Agenda for the day"
                        value={day.agenda}
                        onChange={(e) => handleDayChange(index, 'agenda', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`transportation-${index}`}
                          checked={day.transportation.required}
                          onCheckedChange={(checked) => 
                            handleDayChange(index, 'transportation', { ...day.transportation, required: checked })
                          }
                        />
                        <Label htmlFor={`transportation-${index}`}>Transportation Required</Label>
                      </div>
                      {day.transportation.required && (
                        <div className="space-y-2 pl-6">
                          <div>
                            <Label htmlFor={`transportation-mode-${index}`} className="block mb-1">Mode of Transportation</Label>
                            <Input
                              id={`transportation-mode-${index}`}
                              placeholder="Mode of Transportation"
                              value={day.transportation.mode}
                              onChange={(e) => handleDayChange(index, 'transportation', { ...day.transportation, mode: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`transportation-cost-company-${index}`} className="block mb-1">Cost to Company</Label>
                            <Input
                              id={`transportation-cost-company-${index}`}
                              placeholder="Enter Cost to Company"
                              value={day.transportation.costToCompany}
                              onChange={(e) => handleDayChange(index, 'transportation', { ...day.transportation, costToCompany: e.target.value })}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`transportation-cost-client-${index}`} className="block mb-1">Cost to Client</Label>
                            <Input
                              id={`transportation-cost-client-${index}`}
                              placeholder="Enter Cost to Client"
                              value={day.transportation.costToClient}
                              onChange={(e) => handleDayChange(index, 'transportation', { ...day.transportation, costToClient: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Add similar sections for hotel and activities */}
                    <div>
                      <Label htmlFor={`day-${index}-inclusions`} className="block mb-1">Inclusions</Label>
                      <Textarea
                        id={`day-${index}-inclusions`}
                        placeholder="List inclusions for this day"
                        value={day.inclusions}
                        onChange={(e) => handleDayChange(index, 'inclusions', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`day-${index}-notes`} className="block mb-1">Notes</Label>
                      <Textarea
                        id={`day-${index}-notes`}
                        placeholder="Enter any relevant notes for this day"
                        value={day.notes}
                        onChange={(e) => handleDayChange(index, 'notes', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addDay} className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Day
                </Button>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Discard</Button>
            <Button type="submit">Save Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

