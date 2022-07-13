const moduleTypeNames = {
  en: {
    bible: 'Bible modules',
    dictionary: 'Dictionaries',
    subheadings: 'Subheadings',
    crossreferences: 'Crossreferences',
    commentaries: 'Commentaries',
    plan: 'Plans',
    devotions: 'Devotions',
    bundle: 'Bundles',
  },
  ru: {
    bible: 'Модули Библии',
    dictionary: 'Словари',
    subheadings: 'Подзаголовки',
    crossreferences: 'Перекрестные ссылки',
    commentaries: 'Комментарии',
    plan: 'Планы чтения',
    devotions: 'Ежедневные чтения',
    bundle: 'Наборы',
  },
}

export const getModuleTypeName = (type: string, lang: string) => {
  return moduleTypeNames[lang][type]
}
