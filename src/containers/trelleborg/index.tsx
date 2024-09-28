/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FormHint } from "@/components/shared/form-hint"
import { MaterialInfo } from "@/containers/material-info"

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

function Trelleborg() {
  const [trelleborg, setTrelleborg] = useState<any[]>([])
  const [hydraulicPower, setHydraulicPower] = useState<any[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      boreDia: "",
      rodDia: "",
      stockLength: "",
      rodPressure: "",
      borePressure: "",
      testPressure: "",
      rodSpeed: "",
      pistonSpeed: "",
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
        return (Ar * data.stockLength) / 1000000
      },
      volumeOfPistonSide() {
        const Ab = this.pistonAreaOfCylinder()
        return (Ab * data.stockLength) / 1000000
      },
      testPressureRodSide() {
        return data.rodPressure * data.testPressure
      },
      testPressureBoreSide() {
        return data.borePressure * data.testPressure
      },
      pullingForceRodeSide() {
        const Ar = this.rodAreaOfCylinder()
        return (0.01 * data.rodPressure * Ar) / 1000
      },
      pushingForcePistonSide() {
        const Ab = this.pistonAreaOfCylinder()
        return (0.01 * data.borePressure * Ab) / 1000
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

        return (Ar * rod) / 1000
      },
      loweringFlowPistonSide() {
        const Ab = this.pistonAreaOfCylinder() / 100
        const rod = data.pistonSpeed * 100

        return (Ab * rod) / 1000
      },
      pumpRodSide() {
        const lfp = this.liftingFlowRodSide()
        return lfp * data.cylinder
      },
      pumpPistonSide() {
        const lfp = this.loweringFlowPistonSide()
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
      motorRodSide10() {
        return this.motorRodSide() * 1.1
      },
      getHydraulicCylinder() {
        return [
          {
            id: 1,
            type: "sub-heading",
            description: "Area",
          },
          {
            id: 2,
            symbol: "A-r",
            description: "Annulur (Rod side)  Area of Cylinder",
            result: this.rodAreaOfCylinder().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 3,
            symbol: "A-b",
            description: "Piston Side Area of Cylinder",
            result: this.pistonAreaOfCylinder().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 4,
            symbol: "z",
            description: "Ratio = Area(Bore) / Area(Rod),",
            result: this.radio().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 5,
            type: "sub-heading",
            description: "Volume",
          },
          {
            id: 6,
            symbol: "V-r",
            description: "Volume of Annular (Rod) Side",
            result: this.volumeOfRodSide().toFixed(2),
            units: "Litre",
            type: "cell",
          },
          {
            id: 7,
            symbol: "V-b",
            description: "Volume of Piston Side",
            result: this.volumeOfPistonSide().toFixed(2),
            units: "Litre",
            type: "cell",
          },

          {
            id: 8,
            type: "sub-heading",
            description: "Force",
          },
          {
            id: 9,
            symbol: "F",
            description: "Pulling Force - Rod Side",
            result: this.pullingForceRodeSide().toFixed(2),
            units: "Ton",
            type: "cell",
          },
          {
            id: 10,
            symbol: "F",
            description: "Pushing Force - Piston Side",
            result: this.pushingForcePistonSide().toFixed(2),
            units: "Ton",
            type: "cell",
          },
          {
            id: 11,
            type: "sub-heading",
            description: "Speed",
          },
          {
            id: 12,
            symbol: "",
            description: "Lifting Cylinder -Rod Side",
            result: this.liftingCylinderRodSideSpeed().toFixed(2),
            units: "m/sec",
            type: "cell",
          },
          {
            id: 13,
            symbol: "",
            description: "Lowering Cylinder - Piston side",
            result: this.loweringCylinderPistonSideSpeed().toFixed(2),
            units: "m/sec",
            type: "cell",
          },
          {
            id: 14,
            type: "sub-heading",
            description: "Flow",
          },

          {
            id: 15,
            symbol: "",
            description: "Lifting  Flow - Rod Side",
            result: this.liftingFlowRodSide().toFixed(2),
            units: "LPM",
            type: "cell",
          },
          {
            id: 16,
            symbol: "",
            description: "Lowering Flow - Piston Side",
            result: this.loweringFlowPistonSide().toFixed(2),
            units: "LPM",
            type: "cell",
          },
        ]
      },
      getHydraulicParameter() {
        return [
          {
            id: 1,
            type: "sub-heading",
            description: "Pump",
          },
          {
            id: 2,
            symbol: "",
            description: "Pump - Rod side",
            result: this.pumpRodSide().toFixed(2),
            units: "LPM",
            type: "cell",
          },
          {
            id: 3,
            symbol: "",
            description: "Pump - Piston side",
            result: this.pumpPistonSide().toFixed(2),
            units: "LPM",
            type: "cell",
          },
          {
            id: 4,
            type: "sub-heading",
            description: "Motor - 10%",
          },
          {
            id: 5,
            symbol: "",
            description: "Motor - Piston Side",
            result: this.motorRodSide10().toFixed(2),
            units: "KW",
            type: "cell",
          },
          {
            id: 6,
            symbol: "",
            description: "Motor - Piston Side",
            result: this.motorPistonSide10().toFixed(2),
            units: "KW",
            type: "cell",
          },
        ]
      },
    }
    const resultsArray = calculations.getHydraulicCylinder()
    const hydraulicParameter = calculations.getHydraulicParameter()

    setTrelleborg(resultsArray)
    setHydraulicPower(hydraulicParameter)
  }

  return (
    <>
      <Form {...form}>
        <form className="mt-4 sm:mt-8">
          <div className="space-y-3">
            <div>
              <h4 className="inline-flex cursor-pointer items-center justify-center font-sans text-sm font-semibold leading-normal text-gray-900">
                Cylinder
                <MaterialInfo />
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
                    <FormLabel>
                      Bore Diameter<FormHint>mm</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Rod Diameter<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter rod diameter"
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
                    <FormLabel>
                      Stock Length<FormHint>mm</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Bore side pressure<FormHint>Bar</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Rod side pressure<FormHint>Bar</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Test Pressure<FormHint>%</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Rod Side Speed<FormHint>m/min</FormHint>
                    </FormLabel>
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
                    <FormLabel>
                      Piston Side Speed<FormHint>m/min</FormHint>
                    </FormLabel>
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
                  <FormItem className="mt-1 flex flex-col">
                    <FormLabel>No of Cylinder</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          variant={"outline"}
                          className="gap-[3px]"
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const n = i + 1 + ""
                          return (
                            <SelectItem key={n} value={n}>
                              {n}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
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
                  ({ id, description, result, units, symbol, type }) => (
                    <>
                      {type === "sub-heading" && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="bg-slate-50 font-semibold"
                          >
                            {description}
                          </TableCell>
                        </TableRow>
                      )}
                      {type === "cell" && (
                        <TableRow key={id}>
                          <TableCell className="font-medium">
                            {description}
                          </TableCell>
                          <TableCell>{symbol}</TableCell>
                          <TableCell>{result}</TableCell>
                          <TableCell>{units}</TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {hydraulicPower && hydraulicPower.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Hydraulic Power Parameter
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
                {hydraulicPower.map(
                  ({ id, description, result, units, symbol, type }) => (
                    <>
                      {type === "sub-heading" && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="bg-slate-50 font-semibold"
                          >
                            {description}
                          </TableCell>
                        </TableRow>
                      )}
                      {type === "cell" && (
                        <TableRow key={id}>
                          <TableCell className="font-medium">
                            {description}
                          </TableCell>
                          <TableCell>{symbol}</TableCell>
                          <TableCell>{result}</TableCell>
                          <TableCell>{units}</TableCell>
                        </TableRow>
                      )}
                    </>
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
