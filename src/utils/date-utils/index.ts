import dayjs from "dayjs"

export const getDates = (date?: string) => (date ? new Date(date) : new Date())

const DATE_FORMATS = {
  D_MMM_YYYY: "D MMM YYYY",
  D_MMM_YYYY_HH_MM_A: "D MMM YYYY h:mm A",
}
export const format = (
  date: string,
  type: keyof typeof DATE_FORMATS = "D_MMM_YYYY"
) => {
  const formatString = DATE_FORMATS[type]
  return dayjs(date).format(formatString)
}
