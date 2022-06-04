import { IContextMenuProps } from './types'

const useBase = ({ onSelect }: IContextMenuProps) => {
  const handleSelect = (e: any) => {
    onSelect(e.target.value)
  }

  return {
    handleSelect,
  }
}

export default useBase
