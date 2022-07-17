import { IDictionarySettingsDialogProps } from './types'

const useBase = ({ isVisible, onCloseTabs }: IDictionarySettingsDialogProps) => {
  return { result: isVisible }
}

export default useBase
