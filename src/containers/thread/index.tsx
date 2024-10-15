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

const formSchema = z.object({
  prMaterial: z.string().optional(),
  prYieldStrength: z.string().min(1, { message: "Yield strength required" }),
  prTensileStrength: z
    .string()
    .min(1, { message: "Tensile strength required" }),
  prElongation: z.string().min(1, { message: "Tensile strength required" }),
  pMaterial: z.string().optional(),
  pYieldStrength: z.string().min(1, { message: "Yield strength required" }),
  pTensileStrength: z.string().min(1, { message: "Tensile strength required" }),
  pElongation: z.string().min(1, { message: "Tensile strength required" }),
  majorDia: z.string().min(1, { message: "Thread major dia required" }),
  pitchDia: z.string().min(1, { message: "Thread pitch dia required" }),
  threadLength: z.string().min(1, { message: "Thread length required" }),
  minorDia: z.string().min(1, { message: "Thread minor dia required" }),
  rodInnerDia: z.string().min(1, { message: "Rod Inner dia required" }),
  tensileLoad: z.string().min(1, { message: "Tensile load required" }),
})

function Thread() {
  const [threads, setThreads] = useState<any[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prMaterial: "",
      prYieldStrength: "",
      prTensileStrength: "",
      prElongation: "",
      pMaterial: "",
      pYieldStrength: "",
      pTensileStrength: "",
      pElongation: "",
      majorDia: "",
      pitchDia: "",
      threadLength: "",
      minorDia: "",
      rodInnerDia: "",
      tensileLoad: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { prMaterial, ...rest } = values
    const data = convertValuesToNumbers(rest)
    const calculations = {
      crossSectionArea() {
        return (
          (3.14 / 4) *
          (Math.pow(data.minorDia, 2) - Math.pow(data.rodInnerDia, 2))
        )
      },
      tensileStress() {
        return data.tensileLoad / this.crossSectionArea()
      },
      maxPermissibleTensileStress() {
        return data.prYieldStrength * 0.4
      },
      tensileSafetyOfFactor() {
        return this.maxPermissibleTensileStress() / this.tensileStress()
      },
      shearStressArea() {
        return 3.14 * data.minorDia * data.threadLength * 0.75
      },
      shearStress() {
        return data.tensileLoad / this.shearStressArea()
      },
      maxPermissibleShearStress() {
        return (data.pYieldStrength * 0.25) / 2
      },
      shearSafetyOfFactor() {
        return this.maxPermissibleShearStress() / this.shearStress()
      },
      getResults() {
        return [
          {
            id: 1,
            type: "sub-heading",
            description: "Thread Tensile Stress",
          },
          {
            id: 2,
            symbol: "",
            description: "Cross sectional Area",
            result: this.crossSectionArea().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 3,
            symbol: "ST",
            description: "Tensile Stress",
            result: this.tensileStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 4,
            symbol: "Yar",
            description: "The Maximum Permissible Tensile Stress",
            result: this.maxPermissibleTensileStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 5,
            symbol: "",
            description: "Safety of factor",
            result: this.tensileSafetyOfFactor().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 6,
            type: "sub-heading",
            description: "Thread Shear Stress",
          },
          {
            id: 7,
            symbol: "",
            description: "Shear Stress Area",
            result: this.shearStressArea().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 7,
            symbol: "SS",
            description: "Shear Stress",
            result: this.shearStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 8,
            symbol: "fs",
            description: "The Maximum Permissible Shear Stress min(Sar or Sap)",
            result: this.maxPermissibleShearStress().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 9,
            symbol: "",
            description: "Safety of factor",
            result: this.shearSafetyOfFactor().toFixed(2),
            units: "",
            type: "cell",
          },
        ]
      },
    }
    const resultsArray = calculations.getResults()
    setThreads(resultsArray)
  }

  return (
    <>
      <Form {...form}>
        <form className="mt-4 sm:mt-8">
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Piston Rod Material
              </h4>
              <p className="text-xs">
                Dimensions of the tube, including Material, yield strength,
                tensile strength
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="prMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Piston Rod Material</FormLabel>
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
                              "prYieldStrength",
                              selected?.yieldStress + ""
                            )

                            form.setValue(
                              "prTensileStrength",
                              selected?.tensileStress + ""
                            )

                            form.setValue(
                              "prElongation",
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
                name="prYieldStrength"
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
                name="prTensileStrength"
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
                name="prElongation"
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
          <Separator className="my-6" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Piston Material
              </h4>
              <p className="text-xs">
                Dimensions of the tube, including Material, yield strength,
                tensile strength
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="pMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Piston Material</FormLabel>
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
                              "pYieldStrength",
                              selected?.yieldStress + ""
                            )

                            form.setValue(
                              "pTensileStrength",
                              selected?.tensileStress + ""
                            )

                            form.setValue(
                              "pElongation",
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
                name="pYieldStrength"
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
                name="pTensileStrength"
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
                name="pElongation"
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
          <Separator className="my-6" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Thread
              </h4>
              <p className="text-xs">
                Piston and rod dimensions of the Thread, including Diameters and
                Length,
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="majorDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Major Diameter<FormHint>mm</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter major dia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pitchDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pitch Diameter<FormHint>mm</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter pitch dia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="threadLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thread Length<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter thread length"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minorDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Minor Diameter<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter minor dia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rodInnerDia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rod Inner Diameter<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter rod inner dia"
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
                Pulling Force
              </h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="tensileLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tensile Load of Cylinder <FormHint>N</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter major dia"
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
      {threads && threads.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Piston Rod to Piston - Thread Calculation
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
                {threads.map(
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

export { Thread }
