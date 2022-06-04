import { ETabType } from 'components/Tab/types'
import noop from 'helpers/noop'
import React, { FC } from 'react'
import Tab from './components/Tab'
import { STabs, STabsPane, STabsUl } from './styled.index'
import { ITabsProps } from './types'
import useBase from './useBase'

const Tabs: FC<ITabsProps> = (props) => {
  const { tabs, selectedIndex } = useBase(props)

  return (
    <STabs>
      <STabsUl>
        {tabs.map((tabProps, index) => (
          <Tab {...tabProps} key={tabProps.index} isActive={selectedIndex === index} />
        ))}
      </STabsUl>
      {tabs
        .filter(({ type }) => type === ETabType.tab)
        .map(({ index, children }) => (
          <STabsPane key={index} $isActive={selectedIndex === index}>
            {children}
          </STabsPane>
        ))}
    </STabs>
  )
}

Tabs.defaultProps = {
  selectedIndex: 0,
  onChange: noop,
}

export default Tabs
