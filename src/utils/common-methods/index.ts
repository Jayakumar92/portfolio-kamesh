/* eslint-disable no-prototype-builtins */

export const DATA = "DATA"

let isMac: boolean | undefined

export function ifObjectExist(value: object) {
  let is_valid = true
  if (Object.keys(value).length !== 0) {
    is_valid = false
  }
  return is_valid
}

type ArrayItem<T> = {
  [K in keyof T]: T[K]
}

export function getObjectFromArrayByKey<T extends Record<string, unknown>>(
  array: ArrayItem<T>[],
  key: keyof T,
  value: T[keyof T]
): ArrayItem<T> | undefined {
  return array.find((item) => item[key] === value)
}

export function ifObjectKeyExist(
  object: Record<string, unknown>,
  key: string
): boolean {
  return object[key] !== undefined
}

export function getArrayFromArrayOfObject<T extends Record<string, unknown>>(
  data: T[],
  key: keyof T
) {
  const modifiedArr: (T[keyof T] | null | undefined)[] = []
  if (data && data.length > 0) {
    data.forEach((el) => {
      modifiedArr.push(el[key])
    })
  }
  return modifiedArr
}

export function capitalizeFirstLetter(string: string) {
  if (string !== undefined && string !== null && string.length > 0) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}

export function stringSlice(string: string, slice: number = 3) {
  return string.slice(0, slice)
}

export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent

  const platform = navigator.platform
  const regex = /\(([^)]+)\)/
  const match = regex.exec(userAgent)
  let brand
  let model
  if (match && match.length > 1) {
    const deviceInfo = match[1].split(";")
    brand = deviceInfo[0].trim()
    model = deviceInfo[1].trim()
  }
  return { brand, model, platform }
}

export async function checkMicrophoneState() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const audioTrack = stream.getAudioTracks()[0]
    return audioTrack.enabled
  } catch (error) {
    console.error("Error accessing microphone:", error)
    return false // Microphone is not accessible
  }
}

export function gotoPermissionSetting(
  permissionType?: "microphone" | "camera"
) {
  let settingsUrl = ""

  // Check if the user is using Windows
  if (navigator.userAgent.includes("Win")) {
    settingsUrl =
      permissionType === "microphone"
        ? "ms-settings:privacy-microphone"
        : "ms-settings:privacy-webcam"
  }
  // Check if the user is using macOS
  else if (navigator.userAgent.includes("Mac")) {
    settingsUrl =
      permissionType === "microphone"
        ? "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone"
        : "x-apple.systempreferences:com.apple.preference.security?Privacy_Camera"
  }
  // For other operating systems, provide a message
  else {
    alert(
      `${permissionType} settings are not available on your current operating system.`
    )
    return
  }

  window.open(settingsUrl)
}

export function copyToClipboard(text: string) {
  const textarea = document.createElement("textarea")
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand("copy")
  document.body.removeChild(textarea)
}

export function isKeyValueExistInArray(
  array: Record<string, unknown>[],
  key: string,
  value: string
): boolean {
  return array.some((item) => item[key] === value)
}

export const stopPrevent = <T extends Event>(e: T): T => {
  ;(e as Event).stopPropagation()
  ;(e as Event).preventDefault()

  return e
}

interface Navigator {
  userAgentData?: {
    brands: { brand: string; version: string }[]
    mobile: boolean
    platform: string
    getHighEntropyValues: (hints: string[]) => Promise<{
      platform: string
      platformVersion: string
      uaFullVersion: string
    }>
  }
}

function getPlatform(): string {
  const nav = navigator as Navigator

  if (nav.userAgentData) {
    if (nav.userAgentData.platform) {
      return nav.userAgentData.platform
    }

    nav.userAgentData
      .getHighEntropyValues(["platform"])
      .then((highEntropyValues) => {
        if (highEntropyValues.platform) {
          return highEntropyValues.platform
        }
      })
  }

  if (typeof navigator.platform === "string") {
    return navigator.platform
  }

  return ""
}

export function isMacOS() {
  if (isMac === undefined) {
    isMac = getPlatform().toLowerCase().includes("mac")
  }

  return isMac
}

interface ShortcutKeyResult {
  symbol: string
  readable: string
}

export function getShortcutKey(key: string): ShortcutKeyResult {
  const lowercaseKey = key.toLowerCase()
  if (lowercaseKey === "mod") {
    return isMacOS()
      ? { symbol: "⌘", readable: "Command" }
      : { symbol: "Ctrl", readable: "Control" }
  } else if (lowercaseKey === "alt") {
    return isMacOS()
      ? { symbol: "⌥", readable: "Option" }
      : { symbol: "Alt", readable: "Alt" }
  } else if (lowercaseKey === "shift") {
    return isMacOS()
      ? { symbol: "⇧", readable: "Shift" }
      : { symbol: "Shift", readable: "Shift" }
  } else {
    return { symbol: key, readable: key }
  }
}

export const getInitials = (name: string) => {
  const parts = name.split(" ")
  const initials =
    parts.length > 1
      ? parts
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
      : name.slice(0, 2)

  return initials.toUpperCase()
}

export const convertValuesToNumbers = (
  obj: Record<string, string>
): Record<string, number> => {
  const result: Record<string, number> = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = parseFloat(obj[key])
    }
  }
  return result
}

export const copyTextToClipboard = (text: string) => {
  if ("clipboard" in navigator) {
    return navigator.clipboard.writeText(text)
  } else {
    return document.execCommand("copy", true, text)
  }
}
