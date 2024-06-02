"use client"
import React, { useState } from "react"
import Input from "@/components/general/input"
import Button from "@/components/general/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import {
  boreSideAreaOfCylinder,
  rodSideAreaOfCylinder,
  ratioBoreAndRod,
  barToKgfPerCm2,
  barToKgfPerMm2,
  mm2ToCm2,
  metersPerMinToCentimetersPerMin,
  cm3PerMinToLitersPerMin,
  lpmToMm3PerMin,
  mmToCm,
  mmToMeter,
  mm2ToM2,
  mm3ToCm3,
  mm3ToM3,
  mm3ToLiter,
  barToMPa,
  barToNPerMm2,
  kgfToNewtons,
  kgfToTons,
  kgfToKilonewtons,
  metersPerSecToMillimetersPerSec,
  metersPerSecToCentimetersPerSec,
  gmPerCcToKgPerMm3,
  lpmToMm3PerSec,
  minToSec,
  mmPerMinToMetersPerMin,
  mmPerMinToMetersPerSec,
  speedPerCylinder,
} from "./calculation"

type Cylinder = {
  bore_dia: any
  rod_dia: any
  stock_length: any
  bore_pressure: any
  rod_pressure: any
  test_pressure: any
  lifting: any
  lowering: any
}
const NO_DATA = [
  {
    id: 1,
    value: "",
    unit: "",
  },
  {
    id: 2,
    value: "",
    unit: "",
  },
  {
    id: 3,
    value: "",
    unit: "",
  },
  {
    id: 4,
    value: "",
    unit: "",
  },
]

function Resources() {
  const [cylinder, setCylinder] = useState<Cylinder>({
    bore_dia: "",
    rod_dia: "",
    stock_length: "",
    bore_pressure: "",
    rod_pressure: "",
    test_pressure: "",
    lifting: "",
    lowering: "",
  })
  const [results, setResults] = useState<
    {
      id: number
      title: string
      value: { id: number; symbol: string; value: string; units: string }[]
    }[]
  >([])

  const [error, setError] = useState(true)

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const convertedValue = parseFloat(e.target.value)
    const key = e.target.name

    setCylinder({
      ...cylinder,
      [key]: convertedValue,
    })
  }

  const checkCylinderValues = (cylinder: any) => {
    for (let key in cylinder) {
      if (!cylinder[key]) {
        return false
      }
    }
    return true
  }

  function calculateCylinder() {
    if (checkCylinderValues(cylinder)) {
      setError(false)
      const general = {
        id: 1,
        title: "General Technical Information  Hydraulic Cylinder",
        value: [
          {
            id: 1,
            title: "Bore Diameter of Cylinder",
            symbol: "D",
            value: cylinder.bore_dia,
            units: "mm",
            conversion: [
              {
                id: 1,
                value: mmToCm(cylinder.bore_dia),
                unit: "cm",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: mmToMeter(cylinder.bore_dia),
                unit: "m",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Rod  Diameter of Cylinder",
            symbol: "d",
            value: cylinder.rod_dia,
            units: "mm",
            conversion: [
              {
                id: 1,
                value: mmToCm(cylinder.rod_dia),
                unit: "cm",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: mmToMeter(cylinder.rod_dia),
                unit: "m",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 3,
            title: "Stroke Length of Cylinder",
            symbol: "s",
            value: cylinder.stock_length,
            units: "mm",
            conversion: [
              {
                id: 1,
                value: mmToCm(cylinder.stock_length),
                unit: "cm",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: mmToMeter(cylinder.stock_length),
                unit: "m",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const rodSideArea = rodSideAreaOfCylinder(
        cylinder.bore_dia,
        cylinder.rod_dia
      )
      const boreSideArea = boreSideAreaOfCylinder(cylinder.bore_dia)

      const ratio = ratioBoreAndRod(boreSideArea, rodSideArea)

      const area = {
        id: 2,
        title: "Area",
        value: [
          {
            id: 1,
            title: "Annulur (Rod side)  Area of Cylinder",
            symbol: "A-r",
            value: rodSideArea,
            units: "mm^2",
            conversion: [
              {
                id: 1,
                value: mm2ToCm2(rodSideArea),
                unit: "cm^2",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: mm2ToM2(rodSideArea),
                unit: "m^2",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Piston  Side Area of Cylinder",
            symbol: "A-b",
            value: boreSideArea,
            units: "mm^2",
            conversion: [
              {
                id: 1,
                value: mm2ToCm2(boreSideArea),
                unit: "cm^2",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: mm2ToM2(boreSideArea),
                unit: "m^2",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 3,
            title: "Ratio  = Area (Bore ) / Area (Rod)",
            symbol: "z",
            value: ratio,
            units: "",
            conversion: NO_DATA,
          },
        ],
      }

      const rodVolume = rodSideArea * cylinder.stock_length
      const boreVolume = boreSideArea * cylinder.stock_length

      const volume = {
        id: 3,
        title: "Volume",
        value: [
          {
            id: 1,
            title: "Volume of Annular (Rod) Side",
            symbol: "V-r",
            value: rodVolume,
            units: "mm^3",
            conversion: [
              {
                id: 1,
                value: mm3ToCm3(rodVolume),
                unit: "cm^2",
              },
              {
                id: 2,
                value: mm3ToLiter(rodVolume),
                unit: "Liter",
              },
              {
                id: 3,
                value: mm3ToM3(rodVolume),
                unit: "m^2",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Volume of Piston  Side",
            symbol: "V-b",
            value: boreVolume,
            units: "mm^3",
            conversion: [
              {
                id: 1,
                value: mm3ToCm3(boreVolume),
                unit: "cm^2",
              },
              {
                id: 2,
                value: mm3ToLiter(boreVolume),
                unit: "Liter",
              },
              {
                id: 3,
                value: mm3ToM3(boreVolume),
                unit: "m^2",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const testPressureRod = cylinder.rod_pressure * cylinder.test_pressure
      const testPressureBore = cylinder.bore_pressure * cylinder.test_pressure

      const pressure = {
        id: 4,
        title: "Pressure",
        value: [
          {
            id: 1,
            title: "Working Pressure at Rod side",
            symbol: "Pr",
            value: cylinder.rod_pressure,
            units: "bar",
            conversion: [
              {
                id: 1,
                value: barToKgfPerMm2(cylinder.rod_pressure),
                unit: "kgf/mm^2",
              },
              {
                id: 2,
                value: barToKgfPerCm2(cylinder.rod_pressure),
                unit: "kgf/cm^2",
              },
              {
                id: 3,
                value: barToMPa(cylinder.rod_pressure),
                unit: "Mpa",
              },
              {
                id: 4,
                value: barToNPerMm2(cylinder.rod_pressure),
                unit: "N/mm^2",
              },
            ],
          },
          {
            id: 2,
            title: "Working Pressure at Bore  side",
            symbol: "Pb",
            value: cylinder.bore_pressure,
            units: "bar",
            conversion: [
              {
                id: 1,
                value: barToKgfPerMm2(cylinder.bore_pressure),
                unit: "kgf/mm^2",
              },
              {
                id: 2,
                value: barToKgfPerCm2(cylinder.bore_pressure),
                unit: "kgf/cm^2",
              },
              {
                id: 3,
                value: barToMPa(cylinder.bore_pressure),
                unit: "Mpa",
              },
              {
                id: 4,
                value: barToNPerMm2(cylinder.bore_pressure),
                unit: "N/mm^2",
              },
            ],
          },
          {
            id: 3,
            title: "Test Pressure = Working Pressure * 1.5",
            symbol: "",
            value: cylinder.test_pressure,
            units: "bar",
            conversion: NO_DATA,
          },
          {
            id: 4,
            title: "Test Pressure at Rod side",
            symbol: "Pr",
            value: testPressureRod,
            units: "bar",
            conversion: [
              {
                id: 1,
                value: barToKgfPerMm2(testPressureRod),
                unit: "kgf/mm^2",
              },
              {
                id: 2,
                value: barToKgfPerCm2(testPressureRod),
                unit: "kgf/cm^2",
              },
              {
                id: 3,
                value: barToMPa(testPressureRod),
                unit: "Mpa",
              },
              {
                id: 4,
                value: barToNPerMm2(testPressureRod),
                unit: "N/mm^2",
              },
            ],
          },
          {
            id: 4,
            title: "Test Pressure at Bore side",
            symbol: "Pp",
            value: testPressureBore,
            units: "bar",
            conversion: [
              {
                id: 1,
                value: barToKgfPerMm2(testPressureBore),
                unit: "kgf/mm^2",
              },
              {
                id: 2,
                value: barToKgfPerCm2(testPressureBore),
                unit: "kgf/cm^2",
              },
              {
                id: 3,
                value: barToMPa(testPressureBore),
                unit: "Mpa",
              },
              {
                id: 4,
                value: barToNPerMm2(testPressureBore),
                unit: "N/mm^2",
              },
            ],
          },
        ],
      }

      const rodPullingForce =
        barToKgfPerMm2(cylinder.rod_pressure) * rodSideArea
      const pistonPushingForce =
        barToKgfPerMm2(cylinder.bore_pressure) * boreSideArea

      const force = {
        id: 5,
        title: "Force",
        value: [
          {
            id: 1,
            title: "Pulling Force - Rod Side",
            symbol: "F = P*A",
            value: rodPullingForce,
            units: "Kg F",
            conversion: [
              {
                id: 1,
                value: kgfToTons(rodPullingForce),
                unit: "Ton",
              },
              {
                id: 2,
                value: kgfToKilonewtons(rodPullingForce),
                unit: "KN",
              },
              {
                id: 3,
                value: kgfToNewtons(testPressureBore),
                unit: "N",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Pushing Force - Piston Side",
            symbol: "F = P*A",
            value: pistonPushingForce,
            units: "Kg F",
            conversion: [
              {
                id: 1,
                value: kgfToTons(pistonPushingForce),
                unit: "Ton",
              },
              {
                id: 2,
                value: kgfToKilonewtons(pistonPushingForce),
                unit: "KN",
              },
              {
                id: 3,
                value: kgfToNewtons(pistonPushingForce),
                unit: "N",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const liftingCylinder = cylinder.lifting * 0.166
      const loweringCylinder = cylinder.lowering * 0.166

      const speed = {
        id: 6,
        title: "Speed",
        value: [
          {
            id: 1,
            title: "Lifting Cylinder",
            symbol: "",
            value: cylinder.lifting,
            units: "m/min",
            conversion: [
              {
                id: 1,
                value: metersPerMinToCentimetersPerMin(cylinder.lifting),
                unit: "cm/min",
              },
              {
                id: 2,
                value: metersPerSecToMillimetersPerSec(cylinder.lifting),
                unit: "mm/min",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Lowering Cylinder",
            symbol: "",
            value: cylinder.lowering,
            units: "m/min",
            conversion: [
              {
                id: 1,
                value: metersPerMinToCentimetersPerMin(cylinder.lowering),
                unit: "cm/min",
              },
              {
                id: 2,
                value: metersPerSecToMillimetersPerSec(cylinder.lowering),
                unit: "mm/min",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 3,
            title: "Lifting Cylinder",
            symbol: "",
            value: liftingCylinder,
            units: "m/sec",
            conversion: [
              {
                id: 1,
                value: metersPerSecToCentimetersPerSec(liftingCylinder),
                unit: "cm/sec",
              },
              {
                id: 2,
                value: metersPerSecToMillimetersPerSec(liftingCylinder),
                unit: "mm/sec",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 4,
            title: "Lowering Cylinder",
            symbol: "",
            value: loweringCylinder,
            units: "m/sec",
            conversion: [
              {
                id: 1,
                value: metersPerSecToCentimetersPerSec(loweringCylinder),
                unit: "cm/sec",
              },
              {
                id: 2,
                value: metersPerSecToMillimetersPerSec(loweringCylinder),
                unit: "mm/sec",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const liftingFlow =
        mm2ToCm2(rodSideArea) *
        metersPerMinToCentimetersPerMin(cylinder.lifting)

      const loweringFlow =
        mm2ToCm2(boreSideArea) *
        metersPerMinToCentimetersPerMin(cylinder.lowering)

      const flow = {
        id: 7,
        title: "Flow =  Area * Speed (Lpm)",
        value: [
          {
            id: 1,
            title: "Lifting  Flow",
            symbol: "",
            value: liftingFlow,
            units: "cm^3/min",
            conversion: [
              {
                id: 1,
                value: cm3PerMinToLitersPerMin(liftingFlow),
                unit: "LPM",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Lowering Flow",
            symbol: "",
            value: loweringFlow,
            units: "cm^3/min",
            conversion: [
              {
                id: 1,
                value: cm3PerMinToLitersPerMin(loweringFlow),
                unit: "LPM",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const liftingOnePump = cm3PerMinToLitersPerMin(liftingFlow)
      const liftingTwoPump = liftingOnePump * 2

      const pump = {
        id: 8,
        title: "Pump Capacity",
        value: [
          {
            id: 1,
            title: "Pump  - One Cylinder Lifting",
            symbol: "",
            value: liftingOnePump,
            units: "LPM",
            conversion: NO_DATA,
          },
          {
            id: 2,
            title: "Pump  - Two Cylinder Lifting",
            symbol: "",
            value: liftingTwoPump,
            units: "LPM",
            conversion: NO_DATA,
          },
        ],
      }

      const motor = ((liftingOnePump * testPressureRod) / 600 / 0.9) * 1.1

      const motorObj = {
        id: 9,
        title: "",
        value: [
          {
            id: 1,
            title: "Motor",
            symbol: "",
            value: motor,
            units: "KW",
            conversion: NO_DATA,
          },
          {
            id: 2,
            title: "Motor - 10%",
            symbol: "",
            value: motor * 1.1,
            units: "KW",
            conversion: NO_DATA,
          },
        ],
      }

      const densityOfFluid = 0.865
      const kinematicViscosityFluid = 0.865

      const oil = {
        id: 9,
        title: "Oil Grade",
        value: [
          {
            id: 1,
            title: "Density of Fluid",
            symbol: "p",
            value: densityOfFluid,
            units: "gm/cc",
            conversion: [
              {
                id: 1,
                value: gmPerCcToKgPerMm3(densityOfFluid) + "",
                unit: "kg/mm^3",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Kinematic Viscosity  of Fluid",
            symbol: "v",
            value: kinematicViscosityFluid,
            units: "mm^2/sec",
            conversion: NO_DATA,
          },
          {
            id: 3,
            title: "Oil Flow Rate",
            symbol: "Q",
            value: liftingOnePump,
            units: "LPM",
            conversion: [
              {
                id: 1,
                value: lpmToMm3PerMin(liftingOnePump),
                unit: "mm^3/min",
              },
              {
                id: 2,
                value: lpmToMm3PerSec(liftingOnePump),
                unit: "mm^3/sec",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 4,
            title: "Out Flow - Bore side",
            symbol: "Q/Z",
            value: liftingOnePump / ratio,
            units: "",
            conversion: NO_DATA,
          },
          {
            id: 4,
            title: "Out Flow - Rod side",
            symbol: "Q*Z",
            value: liftingOnePump * ratio,
            units: "",
            conversion: NO_DATA,
          },
        ],
      }

      const timeLifting = rodVolume / lpmToMm3PerMin(liftingOnePump)
      const timeLowering = boreVolume / lpmToMm3PerMin(liftingOnePump)

      const time = {
        id: 10,
        title: "",
        value: [
          {
            id: 1,
            title: "Time  (t =volume/ oil flow rate) - Lifting",
            symbol: "t",
            value: timeLifting,
            units: "min",
            conversion: [
              {
                id: 1,
                value: minToSec(timeLifting),
                unit: "sec",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Time  (t =volume/ oil flow rate) - Lowing",
            symbol: "t",
            value: timeLowering,
            units: "min",
            conversion: [
              {
                id: 1,
                value: minToSec(timeLowering),
                unit: "sec",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const speedLifting = cylinder.stock_length / timeLifting
      const speedLowering = cylinder.stock_length / timeLowering

      const speed2 = {
        id: 11,
        title: "",
        value: [
          {
            id: 1,
            title: "Speed (s = stroke length / time) - Lifting",
            symbol: "s",
            value: speedLifting,
            units: "mm/min",
            conversion: [
              {
                id: 1,
                value: mmPerMinToMetersPerMin(speedLifting),
                unit: "m/min",
              },
              {
                id: 2,
                value: mmPerMinToMetersPerSec(speedLifting),
                unit: "m/sec",
              },
              {
                id: 3,
                value: speedPerCylinder(mmPerMinToMetersPerMin(speedLifting)),
                unit: "spc",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Speed (s = stroke length / time) - Lowering",
            symbol: "s",
            value: speedLowering,
            units: "mm/min",
            conversion: [
              {
                id: 1,
                value: mmPerMinToMetersPerMin(speedLowering),
                unit: "m/min",
              },
              {
                id: 2,
                value: mmPerMinToMetersPerSec(speedLowering),
                unit: "m/sec",
              },
              {
                id: 3,
                value: speedPerCylinder(mmPerMinToMetersPerMin(speedLowering)),
                unit: "spc",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }

      const cylinderLiftingSpeed = lpmToMm3PerMin(liftingOnePump) / rodSideArea
      const cylinderLoweringSpeed =
        lpmToMm3PerMin(liftingOnePump) / boreSideArea

      const cylinderObj = {
        id: 11,
        title: "",
        value: [
          {
            id: 1,
            title: "Cylinder Lifting speed",
            symbol: "Q/Ar",
            value: cylinderLiftingSpeed,
            units: "mm/min",
            conversion: [
              {
                id: 1,
                value: mmPerMinToMetersPerMin(cylinderLiftingSpeed),
                unit: "m/min",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
          {
            id: 2,
            title: "Cylinder Lowering Speed ",
            symbol: "Q/Ap",
            value: cylinderLoweringSpeed,
            units: "mm/min",
            conversion: [
              {
                id: 1,
                value: mmPerMinToMetersPerMin(cylinderLoweringSpeed),
                unit: "m/min",
              },
              {
                id: 2,
                value: "",
                unit: "",
              },
              {
                id: 3,
                value: "",
                unit: "",
              },
              {
                id: 4,
                value: "",
                unit: "",
              },
            ],
          },
        ],
      }
      setResults([
        general,
        area,
        volume,
        pressure,
        force,
        speed,
        flow,
        pump,
        motorObj,
        oil,
        time,
        speed2,
        cylinderObj,
      ])
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-dvh container m-3 mx-auto flex w-screen flex-col  bg-white py-8">
      <Link href="/">
        <ChevronLeft />
      </Link>

      <div className="mb-8 mt-5 flex w-full gap-5">
        <div className="flex w-full flex-col gap-1 md:w-1/3">
          <h3 className=" text-sm font-semibold">Hydraulic Cylinder</h3>
          <div className="flex justify-around gap-2">
            <Input
              id="bore_dia"
              placeholder="Bore Diameter"
              value={cylinder?.bore_dia}
              onChange={inputChange}
            />
            <Input
              id="rod_dia"
              placeholder="Rod Diameter"
              value={cylinder?.rod_dia}
              onChange={inputChange}
            />
            <Input
              id="stock_length"
              placeholder="Stock Length"
              value={cylinder?.stock_length}
              onChange={inputChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 sm:w-1/3">
          <h3 className=" text-sm font-semibold">Pressure</h3>
          <div className="flex justify-around gap-2">
            <Input
              id="rod_pressure"
              placeholder="Rod Pressure"
              value={cylinder?.rod_pressure}
              onChange={inputChange}
            />
            <Input
              id="bore_pressure"
              placeholder="Bore Pressure"
              value={cylinder?.bore_pressure}
              onChange={inputChange}
            />

            <Input
              id="test_pressure"
              placeholder="Test Pressure"
              value={cylinder?.test_pressure}
              onChange={inputChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 md:w-1/3">
          <h3 className=" text-sm font-semibold">Speed</h3>
          <div className="flex justify-around gap-2">
            <Input
              id="lifting"
              placeholder="lifting"
              value={cylinder?.lifting}
              onChange={inputChange}
            />
            <Input
              id="lowering"
              placeholder="lowering"
              value={cylinder?.lowering}
              onChange={inputChange}
            />
            <Button className="w-1/3" onClick={calculateCylinder}>
              Generate
            </Button>
          </div>
        </div>
      </div>

      {!error ? (
        <div className="flex flex-col">
          <div className="flex w-full bg-slate-200 p-2 px-4">
            <div className="flex w-3/5">
              <h3 className="w-2/5 text-sm font-bold">Description</h3>
              <h3 className="w-1/5 text-center text-sm font-bold">Symbol</h3>
              <h3 className="w-1/5 text-center text-sm font-bold">Value</h3>
              <h3 className="w-1/5 text-center text-sm font-bold">units</h3>
            </div>
          </div>

          {results.map(({ id, title, value }: any) => {
            return (
              <div key={id} className="mt-3 w-full">
                <h3 className="my-4 text-sm font-bold text-primary-700">
                  {title}
                </h3>

                {value.map(
                  ({ id, value, symbol, units, title, conversion }: any) => {
                    return (
                      <div className="flex w-full " key={id}>
                        <div className="flex w-3/5 flex-col">
                          <div className="flex w-full justify-evenly py-[6px]">
                            <span className="w-2/5 text-sm font-semibold">
                              {title}
                            </span>
                            <span className=" w-1/5 text-center text-sm font-medium">
                              {symbol}
                            </span>
                            <span className=" w-1/5 text-center text-sm font-medium">
                              {typeof value === "string"
                                ? value
                                : Number(value.toFixed(3))}
                            </span>
                            <span className=" w-1/5 text-center text-sm font-medium">
                              {units}
                            </span>
                          </div>
                        </div>
                        <div className="flex w-2/5 items-center justify-center gap-4">
                          {conversion?.map(({ id, value, unit }: any) => {
                            return (
                              <div
                                key={id}
                                className="flex flex-1 items-center justify-center gap-1  text-sm font-medium"
                              >
                                <span>
                                  {typeof value === "string"
                                    ? value
                                    : Number(value.toFixed(3))}
                                </span>
                                <span>{unit}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex h-fit w-full items-center justify-center py-6">
          <h5 className=" text-sm font-medium text-red-600">
            Please fill in required fields
          </h5>
        </div>
      )}
    </div>
  )
}

export default Resources
