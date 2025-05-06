import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { RequestStatus } from '@/app/components/boards/interfaces/board.interfaces'
import { CreateRequestForm } from './CreateRequestForm';

interface CreateRequestProps {
  status: RequestStatus;
}

export const CreateRequest = ({ status }: CreateRequestProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>    
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600" size="sm">
          <Plus/>
          <span>Nueva</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva solicitud</DialogTitle>
          <DialogDescription>
            Crea una nueva solicitud para el estado {status}.
          </DialogDescription>
        </DialogHeader>
        <CreateRequestForm onClose={() => { setOpen(false) }}>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </CreateRequestForm>
      </DialogContent>
    </Dialog>
  )
}
