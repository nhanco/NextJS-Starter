import i18n from 'i18next'
import Cookies from 'js-cookie'

/**
 * Initialize a i18next instance.
 * @function startI18n
 * @param {object} files - Translation files.
 * @param {string} lang - Active language.
 */
let lang = Cookies.get('lang')
if (!lang) {
  Cookies.set('lang', 'en')
  lang = 'en'
}
const startI18n = files => i18n.init({
  lng: lang, // active language http://i18next.com/translate/
  fallbackLng: 'en',
  resources: files,
  ns: [ 'common' ],
  defaultNS: 'common',
  debug: false,
})

export default startI18n
