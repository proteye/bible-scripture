import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import { AppBar, ContextMenu, Tab, Tabs } from 'components'
import { BibleView } from 'containers/BibleView'
import { InstantView } from 'containers/InstantView'
import useBase from './useBase'
import { ETabType } from 'components/Tab/types'

export const HomePage: NextPage = () => {
  const {
    tabs,
    selectedIndex,
    contextMenuItems,
    instantHtmlText,
    handleChangeTab,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
  } = useBase()

  return (
    <div className="relative block w-screen h-screen">
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar></AppBar>
      <div className="absolute inset-0 flex flex-col mt-16">
        <div className="relative flex flex-col flex-grow w-full overflow-hidden">
          <Tabs selectedIndex={selectedIndex} onChange={handleChangeTab}>
            {tabs.map(({ value, label }, index) => (
              <Tab key={`${index}-${value}`} value={value} label={label} onClose={handleCloseTab}>
                <BibleView
                  key={`${index}-${value}`}
                  moduleName={value}
                  onGetDictionaryTopic={handleGetDictionaryTopic}
                />
              </Tab>
            ))}
            <Tab type={ETabType.button}>
              <ContextMenu label="+" items={contextMenuItems} onSelect={handleAddTab} />
            </Tab>
          </Tabs>
        </div>
        <InstantView htmlText={instantHtmlText} />
      </div>
    </div>
  )
}
