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
  const { targetRef, dimensions, contextMenuItems, onTabsChange } = useBase()

  return (
    <SContainer>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <SContent ref={targetRef}>
        <Tabs defaultSelectedIndex={0} onChange={onTabsChange}>
          <Tab value={EBibleNames.RST_STR} label={EBibleNames.RST_STR} onActive={console.info} onClose={console.info}>
            <BibleView moduleName={EBibleNames.RST_STR} dimensions={dimensions} />
          </Tab>
          <Tab value={EBibleNames.CAS} label={EBibleNames.CAS} onActive={console.info} onClose={console.info}>
            <BibleView moduleName={EBibleNames.CAS} dimensions={dimensions} />
          </Tab>
          <Tab type={ETabType.button}>
            <ContextMenu label="+" items={contextMenuItems} />
          </Tab>
        </Tabs>
      </SContent>
    </SContainer>
  )
}
