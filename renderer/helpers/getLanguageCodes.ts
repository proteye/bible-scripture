export const getLanguageCodes = () => {
  return fetch('/json/ISO_639-2.min.json')
    .then((res) => res.json())
    .then((data) => data)
}
