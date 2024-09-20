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
import { MaterialGrade } from "@/containers/material-grade"

const formSchema = z.object({
  material: z.string().min(1, { message: "Material required" }),
  yieldStrength: z.string().min(1, { message: "Yield strength required" }),
  tensileStrength: z.string().min(1, { message: "Tensile strength required" }),
  elongation: z.string().min(1, { message: "Tensile strength required" }),
  outerDia: z.string().min(1, { message: "Outer dia required" }),
  innerDia: z.string().min(1, { message: "Inner dia required" }),
  joinFactor: z.string().min(1, { message: "Join factor required" }),
  pressure: z.string().min(1, { message: "pressure required" }),
})

type TThickness = {
  id: number
  units: string
  description: string
  result: string
  symbol: string
}

function Thickness() {
  const [buckling, setBuckling] = useState<TThickness[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: "E355",
      yieldStrength: "340",
      tensileStrength: "580",
      elongation: "10",
      outerDia: "50.8",
      innerDia: "35.052",
      joinFactor: "1",
      pressure: "151.68",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { material, ...rest } = values
    const data = convertValuesToNumbers(rest)
    const calculations = {
      designStressYield() {
        return data.yieldStrength * 0.3
      },
      designStressTensile() {
        return data.tensileStrength * 0.5
      },
      shellThickness() {
        return (data.outerDia - data.innerDia) / 2
      },
      allowableDesignStressYield() {
        return (data.yieldStrength / 9.81) * 0.3
      },
      requiredShellThickness() {
        const f = this.allowableDesignStressYield()
        return (data.pressure * data.innerDia) / (200 * f - data.pressure)
      },
      safeFactorInsideDai() {
        const t = this.shellThickness()
        const r = this.requiredShellThickness()
        return t / r
      },
      requiredShellThicknessOutside() {
        const f = this.allowableDesignStressYield()
        return (data.pressure * data.outerDia) / (200 * f + data.pressure)
      },
      safeFactorOutsideDia() {
        const t = this.shellThickness()
        const r = this.requiredShellThicknessOutside()
        return t / r
      },
      getResults() {
        return [
          {
            id: 1,
            symbol: "Yat",
            description: "Allowable design stress (0.30% of Yield stress)",
            result: this.designStressYield().toFixed(2),
            units: "N/mm²",
          },
          {
            id: 2,
            symbol: "Yat",
            description: "Allowable design stress (0.50% of Tensile stress)",
            result: this.designStressTensile().toFixed(2),
            units: "N/mm²",
          },
          {
            id: 3,
            symbol: "t",
            description: "Selected shell thickness",
            result: this.shellThickness().toFixed(2),
            units: "mm",
          },
          {
            id: 4,
            symbol: "f",
            description: "Allowable design stress (0.30% of Yield stress)",
            result: this.allowableDesignStressYield().toFixed(2),
            units: "Kg/mm²",
          },
          {
            id: 5,
            symbol: "t",
            description: "Required shell thickness (Inside Diameter) in mm",
            result: this.requiredShellThickness().toFixed(2),
            units: "7.874 less then",
          },
          {
            id: 6,
            symbol: "",
            description: "Safety of Factor, considering Inside diameter",
            result: this.safeFactorInsideDai().toFixed(2),
            units: "",
          },
          {
            id: 7,
            symbol: "t",
            description: "Required shell thickness (Outside Diameter) in mm",
            result: this.requiredShellThicknessOutside().toFixed(2),
            units: "7.874 less then",
          },
          {
            id: 8,
            symbol: "",
            description: "Safety of Factor , considering Outside  diameter",
            result: this.safeFactorOutsideDia().toFixed(2),
            units: "7.874 less then",
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
                Material
                <span className="ml-2 text-xs font-normal">in mm</span>
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
                Tube
                <span className="ml-2 text-xs font-normal">in mm</span>
              </h4>
              <p className="text-xs">
                Tube dimensions of the cylinder, including diameters, join
                factor, and pressure
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <FormField
                control={form.control}
                name="outerDia"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter outer dai"
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
                name="joinFactor"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter joint factor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pressure"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter pressure"
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
      {buckling && buckling.length > 0 && (
        <div className="mt-10 space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Cylinder wall Thickness calculation
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
                {buckling.map(({ id, description, result, units, symbol }) => (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{description}</TableCell>
                    <TableCell>{symbol}</TableCell>
                    <TableCell>{result}</TableCell>
                    <TableCell>{units}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  )
}

export { Thickness }
