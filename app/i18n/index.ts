import { I18nManager } from "react-native"
import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import "intl-pluralrules"

const fallbackLocale = "en-US"

const en = {}
const resources = { en }
I18nManager.allowRTL(false)

export const initI18n = async () => {
  i18n.use(initReactI18next)

  await i18n.init({
    resources,
    lng: fallbackLocale,
    fallbackLng: fallbackLocale,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}
