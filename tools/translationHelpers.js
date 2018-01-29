/* global fetch */
import 'isomorphic-unfetch'
import Cookies from 'js-cookie'
/**
 * Fetch translation file(s).
 * @function getTranslation
 * @param {string} lang - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translation files.
 */
export async function getTranslation(files) {
  const translation = {}
  let lang = Cookies.get('lang')
  if (!lang) {
    Cookies.set('lang', 'en')
    lang = 'en'
  }
  const baseUrl = 'http://vbo.local/static/locales/'
  for (const file of files) {
    const response = await fetch(`${baseUrl}${lang}/${file}.json`)
    translation[file] = await response.json()
  }

  return { [lang]: translation }
}
