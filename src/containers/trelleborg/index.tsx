"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { convertValuesToNumbers } from "@/utils/common-methods"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  boreDia: z.string().min(1, { message: "Bore dia required" }),
  rodDia: z.string().min(1, { message: "Rod dia required" }),
  stockLength: z.string().min(1, { message: "Stock length required" }),
  rodPressure: z.string().min(1, { message: "Rod pressure required" }),
  borePressure: z.string().min(1, { message: "Bore pressure required" }),
  testPressure: z.string().min(1, { message: "Test pressure required" }),
  rodSpeed: z.string().min(1, { message: "Test pressure required" }),
  pistonSpeed: z.string().min(1, { message: "Test pressure required" }),
  cylinder: z.string().min(1, { message: "Test pressure required" }),
})

type TrelleborgT = {
  id: number
  units: string
  description: string
  result: string
  symbol: string
}

function Trelleborg() {
  const [trelleborg, setTrelleborg] = useState<TrelleborgT[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boreDia: "125",
      rodDia: "70",
      stockLength: "400",
      rodPressure: "200",
      borePressure: "200",
      testPressure: "1.15",
      rodSpeed: "0.5",
      pistonSpeed: "0.5",
      cylinder: "1",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = convertValuesToNumbers(values)
    const calculations = {
      rodAreaOfCylinder() {
        return (
          3.14 * Math.pow(data.boreDia / 2, 2) -
          3.14 * Math.pow(data.rodDia / 2, 2)
        )
      },
      pistonAreaOfCylinder() {
        return 3.14 * Math.pow(data.boreDia / 2, 2)
      },
      radio() {
        const Ab = this.pistonAreaOfCylinder()
        const Ar = this.rodAreaOfCylinder()

        return Ab / Ar
      },
      volumeOfRodSide() {
        const Ar = this.rodAreaOfCylinder()
        return Ar * data.stockLength
      },
      volumeOfPistonSide() {
        const Ab = this.pistonAreaOfCylinder()
        return Ab * data.stockLength
      },
      testPressureRodSide() {
        return data.rodPressure * data.testPressure
      },
      testPressureBoreSide() {
        return data.borePressure * data.testPressure
      },
      pullingForceRodeSide() {
        const Ar = this.rodAreaOfCylinder()
        return 0.01 * data.rodPressure * Ar
      },
      pushingForcePistonSide() {
        const Ab = this.pistonAreaOfCylinder()
        return 0.01 * data.borePressure * Ab
      },
      liftingCylinderRodSideSpeed() {
        return data.rodSpeed * 0.166
      },
      loweringCylinderPistonSideSpeed() {
        return data.pistonSpeed * 0.166
      },
      liftingFlowRodSide() {
        const Ar = this.rodAreaOfCylinder() / 100
        const rod = data.rodSpeed * 100

        return Ar * rod
      },
      loweringFlowPistonSide() {
        const Ab = this.pistonAreaOfCylinder() / 100
        const rod = data.pistonSpeed * 100

        return Ab * rod
      },
      pumpRodSide() {
        const lfp = this.liftingFlowRodSide() / 1000
        return lfp * data.cylinder
      },
      pumpPistonSide() {
        const lfp = this.loweringFlowPistonSide() / 1000
        return lfp * data.cylinder
      },
      motorRodSide() {
        const prs = this.pumpRodSide()
        const tpr = this.testPressureRodSide()
        return ((prs * tpr) / 600 / 0.9) * 1.1
      },
      motorPistonSide() {
        const pps = this.pumpPistonSide()
        const tpb = this.testPressureBoreSide()
        return ((pps * tpb) / 600 / 0.9) * 1.1
      },
      motorPistonSide10() {
        return this.motorPistonSide() * 1.1
      },
      getResults() {
        return [
          {
            id: 1,
            symbol: "A-r",
            description: "Annulur (Rod side)  Area of Cylinder",
            result: this.rodAreaOfCylinder().toFixed(2),
            units: "mm²",
          },
          {
            id: 2,
            symbol: "A-b",
            description: "Piston Side Area of Cylinder",
            result: this.pistonAreaOfCylinder().toFixed(2),
            units: "mm²",
          },
          {
            id: 3,
            symbol: "z",
            description: "Ratio = Area(Bore) / Area(Rod),",
            result: this.radio().toFixed(2),
            units: "",
          },
          {
            id: 4,
            symbol: "V-r",
            description: "Volume of Annular (Rod) Side",
            result: this.volumeOfRodSide().toFixed(2),
            units: "mm³",
          },
          {
            id: 5,
            symbol: "V-b",
            description: "Volume of Piston Side",
            result: this.volumeOfPistonSide().toFixed(2),
            units: "mm³",
          },
          {
            id: 6,
            symbol: "Pr",
            description: "Test Pressure at Rod side",
            result: this.testPressureRodSide().toFixed(2),
            units: "bar",
          },
          {
            id: 7,
            symbol: "Pp",
            description: "Test Pressure at Bore  side",
            result: this.testPressureBoreSide().toFixed(2),
            units: "bar",
          },
          {
            id: 8,
            symbol: "F",
            description: "Pulling Force - Rod Side",
            result: this.pullingForceRodeSide().toFixed(2),
            units: "KgF",
          },
          {
            id: 9,
            symbol: "F",
            description: "Pushing Force - Piston Side",
            result: this.pushingForcePistonSide().toFixed(2),
            units: "KgF",
          },
          {
            id: 10,
            symbol: "",
            description: "Lifting Cylinder -Rod Side",
            result: this.liftingCylinderRodSideSpeed().toFixed(2),
            units: "m/sec",
          },
          {
            id: 11,
            symbol: "",
            description: "Lowering Cylinder - Piston side",
            result: this.loweringCylinderPistonSideSpeed().toFixed(2),
            units: "m/sec",
          },
          {
            id: 12,
            symbol: "",
            description: "Lifting  Flow - Rod Side",
            result: this.liftingFlowRodSide().toFixed(2),
            units: "cm³/min",
          },
          {
            id: 13,
            symbol: "",
            description: "Lowering Flow - Piston Side",
            result: this.loweringFlowPistonSide().toFixed(2),
            units: "cm³/min",
          },
          {
            id: 14,
            symbol: "",
            description: "Pump - Rod side",
            result: this.pumpRodSide().toFixed(2),
            units: "LPM",
          },
          {
            id: 15,
            symbol: "",
            description: "Pump - Piston side",
            result: this.pumpPistonSide().toFixed(2),
            units: "LPM",
          },
          {
            id: 16,
            symbol: "",
            description: "Motor - Rod side",
            result: this.motorRodSide().toFixed(2),
            units: "KW",
          },
          {
            id: 17,
            symbol: "",
            description: "Motor - Piston Side",
            result: this.motorPistonSide().toFixed(2),
            units: "KW",
          },
          {
            id: 18,
            symbol: "",
            description: "Motor - Piston Side - 10%",
            result: this.motorPistonSide10().toFixed(2),
            units: "KW",
          },
        ]
      },
    }
    const resultsArray = calculations.getResults()
    setTrelleborg(resultsArray)
  }

  return (
    <>
      <Form {...form}>
        <form className="mt-4 sm:mt-8">
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Cylinder
                <span className="ml-2 text-xs font-normal">in mm</span>
              </h4>
              <p className="text-xs">
                Hydraulic dimensions of the cylinder, including bore, rod
                diameter, and stock length
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="boreDia"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter bore diameter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rodDia"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter inner diameter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stockLength"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter stock length"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Pressure
                <span className="ml-2 text-xs font-normal">in bar</span>
              </h4>
              <p className="text-xs">
                Hydraulic dimensions of the cylinder, including bore, rod
                pressure
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="rodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter rod pressure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="borePressure"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter bore pressure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter test pressure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Speed / Cylinder
                <span className="ml-2 text-xs font-normal">in m/min</span>
              </h4>
              <p className="text-xs">
                Operation speeds of a hydraulic cylinder for both lifting and
                lowering
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="rodSpeed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter rod speed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pistonSpeed"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter piston speed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cylinder"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter no of cylinder"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <div className="mt-10">
        <Button onClick={form.handleSubmit(onSubmit)} className="sm:w-[20%]">
          Calculate
        </Button>
      </div>

      {trelleborg && trelleborg.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Hydraulic cylinder Design Calculation
          </h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Units</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trelleborg.map(
                  ({ id, description, result, units, symbol }) => (
                    <TableRow key={id}>
                      <TableCell className="font-medium">
                        {description}
                      </TableCell>
                      <TableCell>{symbol}</TableCell>
                      <TableCell>{result}</TableCell>
                      <TableCell>{units}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  )
}

export { Trelleborg }
