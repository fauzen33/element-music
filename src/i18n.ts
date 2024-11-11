import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import EN from '../public/locales/en/translation.json'
import RU from '../public/locales/ru/translation.json'
import TP from '../public/locales/tp/translation.json'


const resources = {
	en: { translation: EN },
	ru: { translation: RU },
	tp: { translation: TP },
}

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ru',
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
