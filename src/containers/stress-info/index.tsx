import Image from "next/image"

import { stress } from "@/assets/images"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/ui/icon"

function StressInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon name="Info" className="ml-1 mt-[2px] h-3 w-3" />
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Strength of Material</DialogTitle>
          <DialogDescription>
            Hydraulic cylinder Design Calculation
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            src={stress}
            alt="stress"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { StressInfo }
