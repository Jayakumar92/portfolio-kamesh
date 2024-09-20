import { useTranslation } from "react-i18next"

import { TxKeyPath } from "@/translations"

type Language = "en" | "ta"

const useTranslate = () => {
  const { t, i18n } = useTranslation()

  function translate(key: TxKeyPath) {
    return t(key)
  }

  function changeLanguageHandler(language: Language = "en") {
    i18n.changeLanguage(language)
  }

  return {
    translate,
    changeLanguageHandler,
  }
}

export { useTranslate }
