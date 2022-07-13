export const addRootElement = (rootElem: Node) => {
  document.body.insertBefore(rootElem, document.body.lastElementChild.nextElementSibling)
}
