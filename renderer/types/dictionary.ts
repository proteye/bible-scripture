import { IDictionaryLookupDictionary } from '@common/types'

export type TSelectedDictionaries = {
  [type in ESelectedDictionaryType]?: IDictionaryLookupDictionary
}

export enum ESelectedDictionaryType {
  hebrew = 'hebrew',
  greek = 'greek',
  strong = 'strong',
  instantDetails = 'instantDetails',
}
