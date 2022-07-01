import { useCallback, useState } from 'react'

const useVisibleSwitch = (initialState = false): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState(initialState)

  const switchState = useCallback(() => setIsVisible((prevState) => !prevState), [])

  return [isVisible, switchState]
}

export default useVisibleSwitch
