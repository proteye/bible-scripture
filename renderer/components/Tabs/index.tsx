import { ETabType } from 'components/Tab/types'
import noop from 'helpers/noop'
import React, { FC } from 'react'
import Tab from './components/Tab'
import { STabs, STabsPane, STabsUl } from './styled.index'
import { ITabsProps } from './types'
import useBase from './useBase'

const Tabs: FC<ITabsProps> = (props) => {
  const { tabs } = useBase(props)

  return (
    <STabs>
      <STabsUl>
        {tabs.map((props) => (
          <Tab {...props} key={props.index} />
        ))}
      </STabsUl>
      {tabs
        .filter(({ type }) => type === ETabType.tab)
        .map(({ index, isActive, children }) => (
          <STabsPane key={index} $isActive={isActive}>
            {children}
          </STabsPane>
        ))}
    </STabs>
  )
}

Tabs.defaultProps = {
  onChange: noop,
}

export default Tabs
