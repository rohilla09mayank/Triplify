import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TemplateListItemProps {
  id: string
  name: string
  description: string
  imageUrl: string
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function TemplateListItem({
  id,
  name,
  description,
  imageUrl,
  onView,
  onEdit,
  onDelete
}: TemplateListItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl">{name}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(id)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onDelete(id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button className="mt-4 w-full" onClick={() => onView(id)}>View Details</Button>
      </CardContent>
    </Card>
  )
}

