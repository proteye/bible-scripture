import React from 'react'
import { Tab } from 'components'
import { Children, useMemo } from 'react'
import { ITab, ITabsProps } from './types'
import { ETabType } from 'components/Tab/types'

const useBase = ({ selectedIndex, children, onChange }: ITabsProps) => {
  const tabs: ITab[] = useMemo(
    () =>
      Children.toArray(children).map((item, index) => {
        if (!React.isValidElement(item) || item.type !== Tab) {
          throw new Error('`Tabs` only accepts children of type `Tab`.')
        }

        const { label, value, type, onActive, onClose, children } = item.props

        const handleActive = (e: React.MouseEvent<HTMLLIElement>) => {
          e.preventDefault()

          const isCloseButton = (e.target as HTMLElement).id === 'close' || (e.target as HTMLElement).parentElement.id === 'close'

          if (type !== ETabType.tab || selectedIndex === index || isCloseButton) {
            return
          }

          if (onActive) {
            onActive(index, value)
          }

          if (onChange) {
            onChange(index, value, item, e)
          }
        }

        const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
          e.preventDefault()
          if (onClose) {
            onClose(index, value)
          }
        }

        return {
          index,
          label,
          value,
          type,
          children,
          onActive: handleActive,
          onClose: handleClose,
        }
      }),
    [selectedIndex, children],
  )

  return {
    tabs,
    selectedIndex,
  }
}

export default useBase
