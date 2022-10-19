import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { LightningBoltIcon, CollectionIcon } from '@heroicons/react/outline'

import { AppBar, ContextMenu, Tab, Tabs } from 'components'
import { ETabType } from 'components/Tab/types'
import { BibleView } from 'containers/BibleView'
import { InstantView } from 'containers/InstantView'
import useBase from './useBase'
import { ModulesDialog } from 'containers/ModulesDialog'
import { DictionarySettingsDialog } from 'containers/DictionarySettingsDialog'

export const MainPage: NextPage = () => {
  const {
    tabs,
    selectedIndex,
    contextMenuItems,
    instantHtmlText,
    dictionaries,
    selectedDictionaries,
    isShowInstant,
    isShowModules,
    isShowDictionarySettings,
    handleChangeTab,
    handleAddTab,
    handleCloseTab,
    handleGetDictionaryTopic,
    setSelectedDictionaries,
    closeTabsByModuleName,
    toggleShowInstant,
    toggleShowModules,
    toggleShowDictionarySettings,
  } = useBase()

  return (
    <div className="relative block w-screen h-screen">
      <Head>
        <title>Bible Scripture</title>
      </Head>
      <AppBar className="items-center justify-center">
        <button
          className={`flex items-center justify-center w-10 h-10 mx-2 rounded ${
            isShowInstant ? 'shadow-sm bg-yellow-100' : 'shadow-md bg-gradient-to-b from-white to-gray-100'
          } active:shadow-sm`}
          onClick={toggleShowInstant}
        >
          <LightningBoltIcon className={`w-6 h-6 ${isShowInstant ? 'text-gray-900' : 'text-gray-700'}`} />
        </button>
      </AppBar>
      <div className="absolute inset-0 flex flex-col mt-16">
        <div className="relative flex flex-col flex-grow w-full overflow-hidden">
          <Tabs selectedIndex={selectedIndex} onChange={handleChangeTab}>
            {tabs.map(({ value, label }, index) => (
              <Tab key={`${index}-${value}`} value={value} label={label} onClose={handleCloseTab}>
                <BibleView
                  key={`${index}-${value}`}
                  moduleName={value}
                  isGetDictionaryTopic={isShowInstant}
                  onGetDictionaryTopic={handleGetDictionaryTopic}
                />
              </Tab>
            ))}
            <Tab type={ETabType.button}>
              <ContextMenu label="+" items={contextMenuItems} onSelect={handleAddTab} />
            </Tab>
          </Tabs>
        </div>
        {isShowInstant && <InstantView htmlText={instantHtmlText} />}
      </div>
      <ModulesDialog isVisible={isShowModules} onCloseTabs={closeTabsByModuleName} onClose={toggleShowModules} />
      <DictionarySettingsDialog
        dictionaries={dictionaries}
        selectedDictionaries={selectedDictionaries}
        isVisible={isShowDictionarySettings}
        onSave={setSelectedDictionaries}
        onClose={toggleShowDictionarySettings}
      />
    </div>
  )
}