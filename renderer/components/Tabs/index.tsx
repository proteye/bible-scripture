import { ETabType } from 'components/Tab/types'
import noop from 'helpers/noop'
import React, { FC } from 'react'
import Tab from './components/Tab'
import { ITabsProps } from './types'
import useBase from './useBase'

const Tabs: FC<ITabsProps> = (props) => {
  const { tabs, selectedIndex } = useBase(props)

  return (
    <div className="flex flex-col flex-grow w-full">
      <ul className="flex h-10 bg-transparent whitespace-nowrap overflow-x-auto">
        {tabs.map((tabProps, index) => (
          <Tab {...tabProps} key={tabProps.index} isActive={selectedIndex === index} />
        ))}
      </ul>
      {tabs
        .filter(({ type }) => type === ETabType.tab)
        .map(({ index, children }) => (
          <div key={index} className={`relative ${selectedIndex === index ? 'flex' : 'hidden'} flex-grow w-full`}>
            {children}
          </div>
        ))}
    </div>
  )
}

Tabs.defaultProps = {
  selectedIndex: 0,
  onChange: noop,
}

export default Tabs
