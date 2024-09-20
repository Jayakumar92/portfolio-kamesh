import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { endCondition } from "@/assets"

import { END_CONDITIONS } from "@/lib/data"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import IconButton from "@/components/general/icon-button"
import { TableProperties } from "lucide-react"

function EndCondition() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <TableProperties className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-5xl">
        <DialogHeader>
          <DialogTitle>End Condition</DialogTitle>
          <DialogDescription>
            {`This table provides end conditions with their corresponding values.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="relative h-full w-full">
              <Image
                src={endCondition}
                alt="material"
                width={400}
                height={400}
                className=" object-contain"
              />
            </div>
          </div>
          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Material Grade</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {END_CONDITIONS.map(({ endCondition, value }) => (
                  <TableRow key={endCondition}>
                    <TableCell className="font-medium">
                      {endCondition}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { EndCondition }
