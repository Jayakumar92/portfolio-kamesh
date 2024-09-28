import Image from "next/image"

import { material } from "@/assets/images"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/ui/icon"

function MaterialInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon name="Info" className="ml-1 mt-[2px] h-3 w-3" />
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-3xl">
        <DialogHeader>
          <DialogTitle>Cylinder</DialogTitle>
          <DialogDescription>
            Hydraulic dimensions of the cylinder, including bore, rod diameter,
            and stock length
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            src={material}
            alt="material"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { MaterialInfo }
