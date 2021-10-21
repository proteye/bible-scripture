import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { AppBar, Tabs, Tab, ContextMenu } from 'components'
import { BibleView } from 'containers/BibleView'
import { SContainer, SContent } from './styled.index'
import useBase from './useBase'
import { ETabType } from 'components/Tab/types'

export const HomePage: NextPage = () => {
  const { tabs, targetRef, dimensions, contextMenuItems, onCloseTab, onSelectBible } = useBase()

  return (
    <SContainer>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <SContent ref={targetRef}>
        <Tabs defaultSelectedIndex={0}>
          {tabs.map(({ value, label }, index) => (
            <Tab key={`${index}-${value}`} value={value} label={label} onClose={onCloseTab}>
              <BibleView key={`${index}-${value}`} moduleName={value} dimensions={dimensions} />
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
