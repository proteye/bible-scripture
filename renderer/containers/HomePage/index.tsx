import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { AppBar, Tabs, Tab, ContextMenu } from 'components'
import { BibleView } from 'containers/BibleView'
import { SContainer, SContent } from './styled.index'
import useBase from './useBase'
import { EBibleNames } from 'containers/BibleView/types'
import { ETabType } from 'components/Tab/types'

export const HomePage: NextPage = () => {
  const { tabs, targetRef, dimensions, contextMenuItems, onTabsChange, onSelectBible } = useBase()

  return (
    <SContainer>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <SContent ref={targetRef}>
        <Tabs defaultSelectedIndex={0} onChange={onTabsChange}>
          {tabs.map(({ value, label }, index) => (
            <Tab key={`${index}-${value}`} value={value} label={label} onActive={console.info} onClose={console.info}>
              <BibleView moduleName={value} dimensions={dimensions} />
            </Tab>
          ))}
          <Tab type={ETabType.button}>
            <ContextMenu label="+" items={contextMenuItems} onSelect={onSelectBible} />
          </Tab>
        </Tabs>
      </SContent>
    </SContainer>
  )
}
