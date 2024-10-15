/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  convertValuesToNumbers,
  getObjectFromArrayByKey,
} from "@/utils/common-methods"
import { MATERIALS } from "@/utils/constants"
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
import { MaterialGrade } from "@/containers/material-grade"
import { StressInfo } from "@/containers/stress-info"

const formSchema = z.object({
  material: z.string().optional(),
  yieldStrength: z.string().min(1, { message: "Yield strength required" }),
  tensileStrength: z.string().min(1, { message: "Tensile strength required" }),
  elongation: z.string().min(1, { message: "Tensile strength required" }),
  outerDia: z.string().min(1, { message: "Outer dia required" }),
  innerDia: z.string().min(1, { message: "Inner dia required" }),
  maxPressure: z.string().min(1, { message: "Pressure required" }),
  maxLoad: z.string().min(1, { message: "Load required" }),
  shearForce: z.string().min(1, { message: "Shear force required" }),
  bearingDiameter: z
    .string()
    .min(1, { message: "Bearing contact diameter required" }),
})

function Stress() {
  const [stress, setStress] = useState<any[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: "",
      yieldStrength: "",
      tensileStrength: "",
      elongation: "",
      outerDia: "",
      innerDia: "",
      maxPressure: "",
      maxLoad: "",
      shearForce: "",
      bearingDiameter: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { material, ...rest } = values
    const data = convertValuesToNumbers(rest)
    const calculations = {
      tubeWallThickness() {
        return (data.outerDia - data.innerDia) / 2
      },
      crossSectionalAreaOfTube() {
        const pi = 3.14
        return (
          (pi * (Math.pow(data.outerDia, 2) - Math.pow(data.innerDia, 2))) / 4
        )
      },
      momentOfInertia() {
        const pi = 3.14
        return (
          (pi / 64) * (Math.pow(data.outerDia, 4) - Math.pow(data.innerDia, 4))
        )
      },
      zm() {
        return this.momentOfInertia() / (data.outerDia / 2)
      },
      frictionalBendingMoment() {
        return (data.maxLoad * 0.1 * data.bearingDiameter) / 2
      },
      axialStress() {
        return data.maxLoad / this.crossSectionalAreaOfTube()
      },
      bendingStress() {
        return this.frictionalBendingMoment() / this.zm()
      },
      hoopStress() {
        return (
          (data.maxPressure * data.innerDia) / (2 * this.tubeWallThickness())
        )
      },
      tensileStress() {
        return this.axialStress() + this.bendingStress()
      },
      shearStressInduced() {
        return data.shearForce / this.crossSectionalAreaOfTube()
      },
      resultantStress() {
        const part1 =
          Math.pow(this.hoopStress(), 2) +
          Math.pow(this.tensileStress(), 2) +
          Math.pow(data.maxPressure, 2) +
          Math.pow(this.shearStressInduced(), 2)
        const part2 =
          this.hoopStress() * this.tensileStress() +
          this.tensileStress() * data.maxPressure +
          data.maxPressure * this.hoopStress()
        const part3 = 3 * Math.pow(this.shearStressInduced(), 2)

        return Math.sqrt(part1 - part2 + part3)
      },
      safetyOfFactor() {
        return (data.yieldStrength * 0.3) / this.resultantStress()
      },
      getResults() {
        return [
          {
            id: 1,
            symbol: "t",
            description: "Tube wall thickness",
            result: this.tubeWallThickness().toFixed(2),
            units: "mm",
            type: "cell",
          },
          {
            id: 2,
            symbol: "At",
            description: "Cross sectional Area of Tube",
            result: this.crossSectionalAreaOfTube().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 3,
            symbol: "i",
            description: "Moment of Interia of Tube",
            result: this.momentOfInertia().toFixed(2),
            units: "mm⁴",
            type: "cell",
          },
          {
            id: 4,
            symbol: "Zm",
            description: "Zm",
            result: this.zm().toFixed(2),
            units: "mm³",
            type: "cell",
          },
          {
            id: 4,
            symbol: "Mf",
            description: "Frictional Bending Moment",
            result: this.frictionalBendingMoment().toFixed(2),
            units: "N.mm",
            type: "cell",
          },
          {
            id: 5,
            symbol: "Mt",
            description: "mt = mf",
            result: this.frictionalBendingMoment().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 6,
            type: "sub-heading",
            description: "Stress",
          },
          {
            id: 7,
            symbol: "St",
            description: "Axial ( Tensile Stress )",
            result: this.axialStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 8,
            symbol: "Sb",
            description: "Bending Stress",
            result: this.bendingStress().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 9,
            type: "sub-heading",
            description: "Load",
          },
          {
            id: 10,
            symbol: "",
            description: "Hoop Stress",
            result: this.hoopStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 11,
            symbol: "",
            description: "Tensile Stress",
            result: this.tensileStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 12,
            symbol: "",
            description: "Stress due to pressure in the tube",
            result: data.maxPressure,
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 13,
            symbol: "",
            description: "Shear Stress Induced",
            result: this.shearStressInduced().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 14,
            symbol: "Sp",
            description:
              "Resultant Stress by Max Shear Strain Energy Method (Max Load) Dubbel Handbook of Mech Engg – Beitz & Kuttner – Springer Verlag London 1994",
            result: this.resultantStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 15,
            type: "sub-heading",
            description: "Safety of factor",
          },
          {
            id: 16,
            symbol: "",
            description: "Safety of factor",
            result: this.safetyOfFactor().toFixed(2),
            units: "",
            type: "cell",
          },
        ]
      },
    }
    const resultsArray = calculations.getResults()
    setStress(resultsArray)
  }

  return (
    <>
      <Form {...form}>
        <form className="mt-4 sm:mt-8">
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Cylinder
              </h4>
              <p className="text-xs">
                Tube dimensions of the cylinder, including Diameters, Max
                pressure, Max load, Force and Tube Principal stress Analysis (
                Max Load)
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="outerDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Outer Diameter<FormHint>mm</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter outer dia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="innerDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Inner Diameter<FormHint>mm</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter inner dia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max Pressure<FormHint>N/mm²</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter max pressure"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Max Load<FormHint>N</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter max load"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shearForce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shear Force<FormHint>N</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter shear force"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bearingDiameter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Spherical Bearing Diameter<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter spherical bearing dia"
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
              <h4 className="inline-flex cursor-pointer items-center justify-center font-sans text-sm font-semibold leading-normal text-gray-900">
                Material
                <StressInfo />
              </h4>

              <p className="text-xs">
                Dimensions of the tube, including Material, yield strength,
                tensile strength
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <div className="flex gap-1">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          const selected = getObjectFromArrayByKey(
                            MATERIALS,
                            "materialGrade",
                            value
                          )
                          if (selected) {
                            form.setValue(
                              "yieldStrength",
                              selected?.yieldStress + ""
                            )

                            form.setValue(
                              "tensileStrength",
                              selected?.tensileStress + ""
                            )

                            form.setValue(
                              "elongation",
                              selected?.elongation + ""
                            )
                          }
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            variant={"outline"}
                            className="flex w-full justify-between overflow-hidden"
                          >
                            <SelectValue placeholder="Select a Material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MATERIALS.map(({ materialGrade }) => {
                            return (
                              <SelectItem
                                key={materialGrade}
                                value={materialGrade}
                              >
                                {materialGrade}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <MaterialGrade />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yieldStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yield Strength</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter yield strength"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tensileStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tensile Strength</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter tensile strength"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="elongation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Elongation<FormHint>%</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter elongation"
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
      {stress && stress.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Cylinder Tube Principal stress calculation
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
                {stress.map(
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
                          <TableCell className="max-w-sm font-medium">
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

export { Stress }
