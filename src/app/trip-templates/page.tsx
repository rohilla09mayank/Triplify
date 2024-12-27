'use client'

import { useState } from 'react'
import { TemplateListItem } from '../components/TemplateListItem'
import { NewTemplateForm } from '../components/NewTemplateForm'
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

interface Template {
  id: string
  name: string
  description: string
  imageUrl: string
}

const initialTemplates: Template[] = [
  {
    id: '1',
    name: 'European Adventure',
    description: 'Explore the best of Europe in this 14-day journey.',
    imageUrl: '/placeholder.svg?height=300&width=400'
  },
  {
    id: '2',
    name: 'Asian Exploration',
    description: 'Discover the wonders of Asia in this 10-day trip.',
    imageUrl: '/placeholder.svg?height=300&width=400'
  },
  {
    id: '3',
    name: 'African Safari',
    description: 'Experience the wildlife of Africa in this 7-day safari.',
    imageUrl: '/placeholder.svg?height=300&width=400'
  }
]

export default function TripTemplates() {
  const [templates, setTemplates] = useState<Template[]>(initialTemplates)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const { toast } = useToast()

  const handleView = (id: string) => {
    toast({
      title: "View Template",
      description: `Viewing template with ID: ${id}`,
    })
  }

  const handleEdit = (id: string) => {
    toast({
      title: "Edit Template",
      description: `Editing template with ID: ${id}`,
    })
  }

  const handleDelete = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== deleteId))
      setDeleteId(null)
      toast({
        title: "Template Deleted",
        description: "The template has been successfully removed.",
      })
    }
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Trip Templates</h1>
        <NewTemplateForm />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map(template => (
          <TemplateListItem
            key={template.id}
            {...template}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this template?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              template and remove its data from our servers.
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

