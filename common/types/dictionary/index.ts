export interface IDictionaryInfo {
  name: string
  value: string
}

export interface IDictionaryLookupDictionaries {
  id: number
  name: string
  type: string
  lang: string
  matchingType: number
  dictionaryRows: number
  wordsRows: number
  lastModified: Date
  isChanged: 0 | 1
  isIndexedSuccessfully: 0 | 1
}

export interface IDictionaryLookupReferences {
  topic: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
  dictionaryId: number
}

export interface IDictionaryLookupTopics {
  topic: string
  topicNf2: string
  topicHash: number
  dictionaryId: number
}

export interface IDictionaryLookupWords {
  wordNf1: string
  wordNf2: string
  topicHash1: number
  topicHash2: number
  topicHash3: number
  bookNumber: number
  chapterNumber: number
  verseNumber: number
  sourceDictionaryId: number
  targetDictionaryId: number
}

export interface IDictionaryViewTopicsByTopic {
  id: number
  topic: string
  topicNf2: string
  language: string
  dictionaryName: string
  dictionaryType: string
}

export interface IDictionaryViewTopicsByWord {
  wordNf: string
  topic: string
  language: string
  dictionaryName: string
  dictionaryType: string
  dictionaryMatchingType: number
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}

export interface IDictionaryDictionary {
  topic: string
  definition: string
  shortDefinition: string
  lexeme: string
  transliteration: string
  pronunciation: string
}

export interface IDictionaryMorphologyIndications {
  indication: string
  applicableTo: string
  meaning: string
}

export interface IDictionaryMorphologyTopics {
  indication: string
  topic: string
}

export interface IDictionaryCognateStrongNumbers {
  groupId: number
  strongNumber: string
}

export interface IDictionarySynonymousStrongNumbers extends IDictionaryCognateStrongNumbers {}

export interface IDictionaryWords {
  variation: string
  standardForm: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}

export interface IDictionaryWordsProcessing {
  type: string
  input: string
  output: string
}
