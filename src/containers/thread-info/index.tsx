import Image from "next/image"

import { thread } from "@/assets/images"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icon } from "@/components/ui/icon"

function ThreadInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Icon name="Info" className="ml-1 mt-[2px] h-3 w-3" />
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-3xl">
        <DialogHeader>
          <DialogTitle>Thread</DialogTitle>
          <DialogDescription>
            Thread Data of the Piston, including bore, rod diameter, and stock
            length
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex h-full w-full items-center justify-center">
          <Image
            src={thread}
            alt="thread"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { ThreadInfo }
