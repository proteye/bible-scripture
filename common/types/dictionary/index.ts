export interface IDictionaryInfo {
  name: string
  value: string
}

export interface IDictionaryDictionary {
  topic: string
  definition: string
  shortDefinition: string
  lexeme: string
  transliteration: string
  pronunciation: string
}

export interface IDictionaryWord {
  variation: string
  standardForm: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}

export interface IDictionaryMorphologyIndication {
  indication: string
  applicableTo: string
  meaning: string
}

export interface IDictionaryMorphologyTopic {
  indication: string
  topic: string
}

export interface IDictionaryCognateStrongNumber {
  groupId: number
  strongNumber: string
}

export interface IDictionarySynonymousStrongNumber extends IDictionaryCognateStrongNumber {}

export interface IDictionaryWordsProcessing {
  type: 'pre' | 'post'
  input: string
  output: string
}

export type TDictionaryType = 'explanatory' | 'concordance' | 'language' | 'lexicon' | 'strong lexicon' | 'translator'

/**
 * Lookup tables
 */
export type TLookupDictionaryList = IDictionaryLookupDictionary[]

export interface IDictionaryLookupDictionary {
  id: number
  name: string
  type: TDictionaryType
  lang: string
  isStrong: boolean
  description: string
  matchingType: number
  dictionaryRows: number
  wordsRows: number
  lastModified: Date
  isChanged: 0 | 1
  isIndexedSuccessfully: 0 | 1
}

export interface IDictionaryLookupTopic {
  topic: string
  topicNf2: string
  topicHash: number
  dictionaryId: number
}

export interface IDictionaryLookupWord {
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

export interface IDictionaryLookupReference {
  topic: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
  dictionaryId: number
}

export interface IDictionaryViewTopicsByTopic {
  id: number
  topic: string
  topicNf2: string
  language: string
  dictionaryName: string
  dictionaryType: TDictionaryType
}

export interface IDictionaryViewTopicsByWord {
  wordNf: string
  topic: string
  language: string
  dictionaryName: string
  dictionaryType: TDictionaryType
  dictionaryMatchingType: number
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}
