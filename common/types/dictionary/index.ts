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

export interface IDictionaryLookupWords {
  topic: string
  topicNf2: string
  topicHash: number
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

export interface IDictionarySynonymousStrongNumbers {
  groupId: number
  strongNumber: string
}

export interface IDictionaryWords {
  variation: string
  standardForm: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}

export interface IDictionaryLookupWords {
  word_nf1: string
  word_nf2: string
  topic_hash1: number
  topic_hash2: number
  topic_hash3: number
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}

export interface IDictionaryWordsProcessing {
  type: string
  input: string
  output: string
}

export interface IDictionaryLookupReferences {
  topic: string
  bookNumber: number
  chapterNumber: number
  verseNumber: number
}
