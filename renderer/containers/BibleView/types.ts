import { IBibleVerse } from '@common/types'
import { IComponentWithDimensions } from 'components/types'

export interface IBibleViewProps extends IComponentWithDimensions {
  moduleName?: string
  onGetDictionaryTopic?(topic: string, morphology?: string): void
}

export interface IBiblePreapredVerse extends IBibleVerse {
  preparedText: JSX.Element[]
}
