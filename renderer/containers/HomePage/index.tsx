import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { AppBar, Tabs, Tab } from 'components'
import { BibleView } from 'containers/BibleView'
import { SContainer, SContent } from './styled.index'
import useBase from './useBase'
import { EBibleNames } from 'containers/BibleView/types'

export const HomePage: NextPage = () => {
  const { targetRef, dimensions, onTabsChange } = useBase()

  return (
    <SContainer>
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <SContent ref={targetRef}>
        <Tabs defaultSelectedIndex={0} onChange={onTabsChange}>
          <Tab value="tab1" label="RST+" onActive={console.info} onClose={console.info}>
            <BibleView moduleName={EBibleNames.RST_STR} dimensions={dimensions} />
          </Tab>
          <Tab value="tab2" label="CAS" onActive={console.info} onClose={console.info}>
            <BibleView moduleName={EBibleNames.CAS} dimensions={dimensions} />
          </Tab>
        </Tabs>
      </SContent>
    </SContainer>
  )
}
