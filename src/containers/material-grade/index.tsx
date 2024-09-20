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
import { material } from "@/assets"

import { MATERIALS } from "@/lib/data"

import { Button } from "@/components/ui/button"
import Image from "next/image"

function MaterialGrade() {
  return (
    <Dialog>
      <DialogTrigger asChild className="flex justify-end">
        <Button className="text-primary" variant="link">
          Material
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-5xl">
        <DialogHeader>
          <DialogTitle>Material</DialogTitle>
          <DialogDescription>
            {`This table lists the material grades with their yield stress, tensile stress, and elongation values.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-6">
          <div className="relative flex  items-center justify-center ">
            <Image src={material} alt="material" width={300} height={300} />
          </div>
          <div className="flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Material Grade</TableHead>
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
                      <TableCell className="font-medium">
                        {materialGrade}
                      </TableCell>
                      <TableCell>{yieldStress}</TableCell>
                      <TableCell>{tensileStress}</TableCell>
                      <TableCell className="text-right">{elongation}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { MaterialGrade }
