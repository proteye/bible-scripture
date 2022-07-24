import { TLookupDictionaryList } from '@common/types'
import { ESelectedDictionaryType, TSelectedDictionaries } from 'types/dictionary'

export interface IDictionarySettingsDialogProps {
  isVisible: boolean
  dictionaries: TLookupDictionaryList
  selectedDictionaries?: TSelectedDictionaries
  onSave?(selectedDictionaries: TSelectedDictionaries): void
  onClose?(): void
}
