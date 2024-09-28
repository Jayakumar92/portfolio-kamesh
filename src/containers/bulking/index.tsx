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
import { END_CONDITIONS, MATERIALS } from "@/utils/constants"
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
import { EndCondition } from "@/containers/end-condition"
import { MaterialGrade } from "@/containers/material-grade"

const formSchema = z.object({
  outerDia: z.string().min(1, { message: "Outer dia required" }),
  innerDia: z.string().min(1, { message: "Inner dia required" }),
  buckingLength: z.string().min(1, { message: "Bucking length required" }),
  rodLength: z.string().min(1, { message: "Rod Length required" }),
  pullLoad: z.string().min(1, { message: "Pull load required" }),
  pushForce: z.string().min(1, { message: "Push force required" }),
  yieldStrength: z.string().optional(),
  tensileStrength: z.string().optional(),
  elongation: z.string().optional(),
  youngModule: z.string().min(1, { message: "Young modules required" }),
  endCondition: z.string().min(1, { message: "End condition required" }),
  material: z.string().min(1, { message: "Material required" }).optional(),
  endConditionDisplay: z.string().min(1, { message: "End condition required" }),
})

function Bulking() {
  const [buckling, setBuckling] = useState<any[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      outerDia: "",
      innerDia: "",
      buckingLength: "",
      rodLength: "",
      pullLoad: "",
      pushForce: "",
      youngModule: "",
      endCondition: "",
      endConditionDisplay: "",
      yieldStrength: "",
      tensileStrength: "",
      elongation: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = convertValuesToNumbers(values)
    const calculations = {
      areaOfCrossSection() {
        return (Math.PI / 4) * (data.outerDia ** 2 - data.innerDia ** 2)
      },
      momentOfInertia() {
        return (Math.PI / 64) * (data.outerDia ** 4 - data.innerDia ** 4)
      },
      radiusOfGyration() {
        const I = this.momentOfInertia()
        const A = this.areaOfCrossSection()
        return Math.sqrt(I / A)
      },
      slendernessRatio() {
        return data.buckingLength / this.radiusOfGyration()
      },
      eulerBucklingStressCompression() {
        return data.pushForce / this.areaOfCrossSection()
      },
      eulerBucklingStressTension() {
        const I = this.momentOfInertia()
        return (
          (data.endCondition * 3.14 ** 2 * data.youngModule * I) /
          data.buckingLength ** 2
        )
      },
      safetyOfFactorInEulerBuckling() {
        const Fe = this.eulerBucklingStressTension()
        return Fe / data.pushForce
      },
      eulerBucklingStress() {
        const A = this.areaOfCrossSection()
        return data.pullLoad / A
      },
      safetyOfFactorInEulerPull() {
        const Fe = this.eulerBucklingStressTension()
        return Fe / data.pullLoad
      },
      getResults() {
        return [
          {
            id: 1,
            symbol: "A",
            description: "Area of Cross Section",
            result: this.areaOfCrossSection().toFixed(2),
            units: "mm²",
            type: "cell",
          },
          {
            id: 2,
            symbol: "I",
            description: "Moment of Inertia",
            result: this.momentOfInertia().toFixed(2),
            units: "mm⁴",
            type: "cell",
          },
          {
            id: 3,
            symbol: "r",
            description: "Radius of Gyration",
            result: this.radiusOfGyration().toFixed(2),
            units: "mm",
            type: "cell",
          },
          {
            id: 4,
            symbol: "Le/r",
            description: "Slenderness Ratio",
            result: this.slendernessRatio().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 5,
            symbol: "Se",
            description: "Euler Buckling Stress",
            result: this.eulerBucklingStressCompression().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 6,
            description: "Push Force",
            type: "sub-heading",
          },
          {
            id: 7,
            symbol: "Fe",
            description: "Euler Force ,Buckling Load",
            result: this.eulerBucklingStressTension().toFixed(2),
            units: "N/mm²",
            type: "cell",
          },
          {
            id: 8,
            symbol: "",
            description:
              "Safety of Factor In Euler Buckling > 2.5, Euler Force / Push Force",
            result: this.safetyOfFactorInEulerBuckling().toFixed(2),
            units: "",
            type: "cell",
          },
          {
            id: 9,
            description: "Pull Force",
            type: "sub-heading",
          },
          {
            id: 8,
            symbol: "Se",
            description: "Euler Buckling stress",
            result: this.eulerBucklingStress().toFixed(2),
            units: "N/mm^2",
            type: "cell",
          },
          {
            id: 9,
            symbol: "",
            description:
              "Safety of Factor In Euler Buckling > 2.5, Euler Force / Pull Force",
            result: this.safetyOfFactorInEulerPull().toFixed(2),
            units: "",
            type: "cell",
          },
        ]
      },
    }
    const resultsArray = calculations.getResults()
    setBuckling(resultsArray)
  }

  return (
    <>
      <Form {...form}>
        <form className="mt-4 sm:mt-8">
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Rod Geometry
              </h4>
              <p className="text-xs">
                Physical dimensions of the rod, including diameters, buckling
                length, and extended length
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
                        placeholder="Rod outer diameter"
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
                        placeholder="Rod inner diameter"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="buckingLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rod Bucking<FormHint>mm</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rod bucking length"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rodLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Rod Length<FormHint>mm</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rod length"
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
                Loading Conditions
                <span className="ml-2 text-[10px] font-normal">in N</span>
              </h4>
              <p className="text-xs">
                Forces applied to the rod, including tensile and compressive
                loads.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="pullLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pull Load<FormHint>N</FormHint>
                    </FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter pull load"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pushForce"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Push Load<FormHint>N</FormHint>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter push force"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-6 h-[0.5px]" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Material
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
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
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

              <FormField
                control={form.control}
                name="youngModule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Young's modulus`}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Young's modulus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-6 h-[0.5px]" />
          <div className="space-y-3">
            <div>
              <h4 className="font-sans text-sm font-semibold leading-normal text-gray-900">
                Buckling
              </h4>
              <p className="text-xs">
                Cylinder collapses under excessive compressive load.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              <FormField
                control={form.control}
                name="endConditionDisplay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End condition</FormLabel>
                    <div className="flex gap-1">
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            const selected = getObjectFromArrayByKey(
                              END_CONDITIONS,
                              "endCondition",
                              value
                            )
                            if (selected) {
                              form.setValue("endCondition", selected?.value)
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className="flex w-full justify-between overflow-hidden text-xs"
                              variant={"outline"}
                            >
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {END_CONDITIONS.map(
                              ({ id, endCondition, value }) => {
                                return (
                                  <SelectItem key={id} value={endCondition}>
                                    {`${value} - ${endCondition}`}
                                  </SelectItem>
                                )
                              }
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <EndCondition />
                    </div>
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

      {buckling && buckling.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Piston Rod Buckling calculation
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
                {buckling.map(
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

export { Bulking }
