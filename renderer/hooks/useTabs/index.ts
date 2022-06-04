import { useCallback, useState } from 'react'

const useTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleSelectTab = useCallback((index: number) => {
    setSelectedIndex(index)
  }, [])

  return { selectedIndex, handleSelectTab }
}

export default useTabs
