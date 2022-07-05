import { languagesISO6392Url } from 'constants/common'

export const getLanguagesISO6392 = async () => {
  const languages = await fetch(languagesISO6392Url).then((res) => res.json())
  languages.iw = languages.he

  return languages
}
