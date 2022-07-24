import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { ESelectedDictionaryType, TSelectedDictionaries } from 'types/dictionary'
import { IDictionarySettingsDialogProps } from './types'

const useBase = ({
  dictionaries,
  selectedDictionaries: selectedDictionariesProp,
  isVisible,
  onSave,
  onClose,
}: IDictionarySettingsDialogProps) => {
  const [selectedDictionaries, setSelectedDictionaries] = useState<TSelectedDictionaries>(
    selectedDictionariesProp ?? {},
  )

  const selectOptions = useMemo(
    () =>
      dictionaries.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      )),
    [dictionaries],
  )

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const name = event.currentTarget.value
    const type = event.currentTarget.dataset['type'] as ESelectedDictionaryType

    setSelectedDictionaries((prevState) => ({
      ...prevState,
      [type]: dictionaries.find((item) => name === item.name),
    }))
  }

  const handleSave = () => {
    onSave?.(selectedDictionaries)
    onClose()
  }

  useEffect(() => {
    if (isVisible) {
      setSelectedDictionaries(selectedDictionariesProp)
    }
  }, [isVisible, selectedDictionariesProp])

  return { selectedDictionaries, selectOptions, handleSelect, handleSave }
}

export default useBase
