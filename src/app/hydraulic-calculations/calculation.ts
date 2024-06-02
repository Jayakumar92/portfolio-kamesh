export const mmToCm = (value: number) => value / 10
export const mmToMeter = (value: number) => value / 1000
export const mm2ToCm2 = (value: number) => value / 100
export const mm2ToM2 = (value: number) => value / 1000000
export const mm3ToCm3 = (value: number) => value / 1000
export const mm3ToLiter = (value: number) => value / 1000000
export const mm3ToM3 = (value: number) => value / 1000000000

export const barToKgfPerMm2 = (value: number) => {
  const conversionFactor = 0.01
  return value * conversionFactor
}
export const barToKgfPerCm2 = (value: number) => {
  const conversionFactor = 1
  return value * conversionFactor
}

export function barToMPa(bar: number) {
  const conversionFactor = 0.1
  return bar * conversionFactor
}

export function barToNPerMm2(bar: number) {
  const conversionFactor = 0.1 // 10^-1
  return bar * conversionFactor
}

export function kgfToTons(weightInKgf: number) {
  // Standard gravity constant in m/s^2
  const standardGravity = 9.80665

  // Convert kgf to tons
  const weightInTons = weightInKgf / (standardGravity * 1000)

  return weightInKgf / 1000
}

export function kgfToKilonewtons(weightInKgf: number) {
  // Standard gravity constant in m/s^2
  const standardGravity = 9.80665

  // Convert kgf to kilonewtons
  const weightInKilonewtons = weightInKgf / standardGravity

  return weightInKgf * 0.00980665
}

export function kgfToNewtons(weightInKgf: number) {
  // Standard gravity constant in m/s^2
  const standardGravity = 9.80665

  // Convert kgf to newtons
  const weightInNewtons = weightInKgf * standardGravity

  return weightInNewtons
}
export function metersPerMinToCentimetersPerMin(valueInMPerMin: number) {
  // Convert meters per minute to centimeters per minute
  return valueInMPerMin * 100
}

export function metersPerMinToMillimetersPerMin(valueInMPerMin: number) {
  // Convert meters per minute to millimeters per minute
  return valueInMPerMin * 1000
}

export function metersPerSecToCentimetersPerSec(valueInMPerSec: number) {
  // Convert meters per second to centimeters per second
  return valueInMPerSec * 100
}

export function metersPerSecToMillimetersPerSec(valueInMPerSec: number) {
  // Convert meters per second to millimeters per second
  return valueInMPerSec * 1000
}

export function cm3PerMinToLitersPerMin(valueInCm3PerMin: number) {
  // Convert cubic centimeters per minute to liters per minute
  return valueInCm3PerMin / 1000
}

export function gmPerCcToKgPerMm3(valueInGmPerCc: number) {
  // Convert grams per cubic centimeter to kilograms per cubic millimeter
  return valueInGmPerCc * 0.000001
}

export function lpmToMm3PerMin(valueInLPerMin: number) {
  // Convert liters per minute to cubic millimeters per minute
  return valueInLPerMin * 1e6
}

export function lpmToMm3PerSec(valueInLPerMin: number) {
  // Convert liters per minute to cubic millimeters per second
  return (valueInLPerMin * 1e6) / 60
}

export function minToSec(valueInMin: number) {
  // Convert minutes to seconds
  return valueInMin * 60
}

export function mmPerMinToMetersPerMin(valueInMMPerMin: number) {
  // Convert millimeters per minute to meters per minute
  return valueInMMPerMin / 1000
}

export function mmPerMinToMetersPerSec(valueInMMPerMin: number) {
  // Convert millimeters per minute to meters per second
  return valueInMMPerMin / (1000 * 60)
}

export function speedPerCylinder(value: number) {
  return value / 2
}

export function metersToMillimeters(valueInMeters: number) {
  // Convert meters to millimeters
  return valueInMeters * 1000
}

export function litersToCubicMillimeters(valueInLiters: number) {
  // Convert liters to cubic millimeters
  return valueInLiters * 1000000
}

/**
 * area calculation
 */

export function boreSideAreaOfCylinder(boreDia: number): number {
  return 3.14 * (boreDia / 2) ** 2
}

export function rodSideAreaOfCylinder(boreDia: number, rodDia: number): number {
  const boreArea = boreSideAreaOfCylinder(boreDia)
  return boreArea - 3.14 * (rodDia / 2) ** 2
}

export function ratioBoreAndRod(boreArea: number, rodArea: number): number {
  return Number((boreArea / rodArea).toFixed(3))
}
