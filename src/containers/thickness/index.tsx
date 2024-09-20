"use client"
import { Input } from "@/components/ui/input"
import { EndCondition } from "@/containers/end-condition"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { convertValuesToNumbers } from "@/lib/calculation"
import { useState } from "react"

const formSchema = z.object({
  outerDia: z.string().min(1, { message: "Outer dia required" }),
  innerDia: z.string().min(1, { message: "Inner dia required" }),
  buckingLength: z.string().min(1, { message: "Bucking length required" }),
  rodLength: z.string().min(1, { message: "Rod Length required" }),
  pullLoad: z.string().min(1, { message: "Pull load required" }),
  pushForce: z.string().min(1, { message: "Push force required" }),
  yield: z.string().min(1, { message: "Yield strength required" }),
  young: z.string().min(1, { message: "Young modules required" }),
  endCondition: z.string().min(1, { message: "End condition required" }),
})

type Bulking = {
  id: number
  units: string
  description: string
  result: string
  symbol: string
}

function Thickness() {
  const [buckling, setBuckling] = useState<Bulking[]>([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      outerDia: "50",
      innerDia: "0",
      buckingLength: "830",
      rodLength: "2793",
      pullLoad: "245250",
      pushForce: "76950.53",
      yield: "640",
      young: "210000",
      endCondition: "1",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const data = convertValuesToNumbers(values)
    const calculations = {
      areaOfCrossSection: function () {
        return (Math.PI / 4) * (data.outerDia ** 2 - data.innerDia ** 2)
      },
      momentOfInertia: function () {
        return (Math.PI / 64) * (data.outerDia ** 4 - data.innerDia ** 4)
      },
      radiusOfGyration: function () {
        const I = this.momentOfInertia()
        const A = this.areaOfCrossSection()
        return Math.sqrt(I / A)
      },
      slendernessRatio: function () {
        return data.buckingLength / this.radiusOfGyration()
      },
      eulerBucklingStressCompression: function () {
        return data.pushForce / this.areaOfCrossSection()
      },
      eulerBucklingStressTension: function () {
        const I = this.momentOfInertia()
        return (
          (data.endCondition * 3.14 ** 2 * data.young * I) /
          data.buckingLength ** 2
        )
      },
      safetyOfFactorInEulerBuckling: function () {
        const Fe = this.eulerBucklingStressTension()
        return Fe / data.pushForce
      },
      eulerBucklingStress: function () {
        const A = this.areaOfCrossSection()
        return data.pullLoad / A
      },
      safetyOfFactorInEulerPull: function () {
        const Fe = this.eulerBucklingStressTension()
        return Fe / data.pullLoad
      },
      getResults: function () {
        return [
          {
            id: 1,
            symbol: "A",
            description: "Area of Cross Section",
            result: this.areaOfCrossSection().toFixed(2),
            units: "mm²",
          },
          {
            id: 2,
            symbol: "I",
            description: "Moment of Inertia",
            result: this.momentOfInertia().toFixed(2),
            units: "mm⁴",
          },
          {
            id: 3,
            symbol: "r",
            description: "Radius of Gyration",
            result: this.radiusOfGyration().toFixed(2),
            units: "mm",
          },
          {
            id: 4,
            symbol: "Le/r",
            description: "Slenderness Ratio",
            result: this.slendernessRatio().toFixed(2),
            units: "",
          },
          {
            id: 5,
            symbol: "Se",
            description: "Euler Buckling Stress",
            result: this.eulerBucklingStressCompression().toFixed(2),
            units: "N/mm²",
          },
          {
            id: 6,
            symbol: "Fe",
            description: "Euler Force ,Buckling Load",
            result: this.eulerBucklingStressTension().toFixed(2),
            units: "N/mm²",
          },
          {
            id: 7,
            symbol: "",
            description:
              "Safety of Factor In Euler Buckling > 2.5, Euler Force / Push Force",
            result: this.safetyOfFactorInEulerBuckling().toFixed(2),
            units: "",
          },
          {
            id: 8,
            symbol: "Se",
            description: "Euler Buckling stress",
            result: this.eulerBucklingStress().toFixed(2),
            units: "N/mm^2",
          },
          {
            id: 9,
            symbol: "",
            description:
              "Safety of Factor In Euler Buckling > 2.5, Euler Force / Pull Force",
            result: this.safetyOfFactorInEulerPull().toFixed(2),
            units: "",
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
        <form className="mt-4 sm:mt-10 ">
          <div className="space-y-3">
            <div className="leading-relaxed">
              <h4 className="font-sans text-sm font-semibold  text-gray-900">
                Rod Geometry
                <span className="ml-2 text-[10px] font-normal">in mm</span>
              </h4>
              <p className="text-xs">
                Physical dimensions of the rod, including diameters, buckling
                length, and extended length
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
              <FormField
                control={form.control}
                name="outerDia"
                render={({ field }) => (
                  <FormItem>
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
          <Separator className="my-4 sm:my-8 " />
          <div className="space-y-3">
            <div className="leading-relaxed">
              <h4 className="font-sans text-sm font-semibold  text-gray-900">
                Loading Conditions
                <span className="ml-2 text-[10px]  font-normal">in N</span>
              </h4>
              <p className="text-xs">
                Forces applied to the rod, including tensile and compressive
                loads.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
              <FormField
                control={form.control}
                name="pullLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="Pull load" {...field} />
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
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Push force"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator className="my-4 h-[0.5px] sm:my-8" />
          <div className="space-y-3">
            <div className="leading-relaxed">
              <h4 className="font-sans text-sm font-semibold  text-gray-900">
                Support Parameters
                <span className="ml-2 text-[10px]  font-normal">in N/mm2</span>
              </h4>
              <p className="text-xs">
                End condition factor affecting the rod’s buckling behavior.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-4 sm:gap-3">
              <FormField
                control={form.control}
                name="yield"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Yield strength"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="young"
                render={({ field }) => (
                  <FormItem>
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
              <div className="flex space-x-1">
                <FormField
                  control={form.control}
                  name="endCondition"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="End condition"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <EndCondition />
              </div>
            </div>
          </div>
        </form>
      </Form>
      <div className="mt-5 sm:mt-10">
        <Button onClick={form.handleSubmit(onSubmit)} className="sm:w-[20%]">
          Calculate
        </Button>
      </div>

      {buckling && buckling.length > 0 && (
        <div className="mt-10 space-y-2">
          <h3 className=" font-sans text-lg font-semibold text-gray-900">
            Piston Rod Buckling calculation
          </h3>
          <div className=" rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Description</TableHead>
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
