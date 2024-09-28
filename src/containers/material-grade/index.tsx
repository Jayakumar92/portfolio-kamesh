import { TableProperties } from "lucide-react"

import { MATERIALS } from "@/utils/constants"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function MaterialGrade() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <TableProperties className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-3xl">
        <DialogHeader>
          <DialogTitle>Material</DialogTitle>
          <DialogDescription>
            {`This table lists the material grades with their yield stress, tensile stress, and elongation values.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <ScrollArea className="max-h-[500px] w-full px-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material Grade</TableHead>
                  <TableHead>Yield Stress</TableHead>
                  <TableHead>Tensile Stress</TableHead>
                  <TableHead className="text-right">Elongation</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {MATERIALS.map(
                  ({
                    elongation,
                    materialGrade,
                    tensileStress,
                    yieldStress,
                  }) => (
                    <TableRow key={materialGrade}>
                      <TableCell className="text-xs font-medium">
                        {materialGrade}
                      </TableCell>
                      <TableCell className="text-xs">{yieldStress}</TableCell>
                      <TableCell className="text-xs">{tensileStress}</TableCell>
                      <TableCell className="text-right text-xs">
                        {elongation === "" ? `${elongation}` : `${elongation}%`}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { MaterialGrade }
