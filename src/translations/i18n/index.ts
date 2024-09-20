import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import en from "../locale/en.json"
import ta from "../locale/ta.json"

const resources = {
  en: {
    translation: en,
  },
  ta: {
    translation: ta,
  },
}

i18next.use(initReactI18next).init({
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  lng: "ta", // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
})
