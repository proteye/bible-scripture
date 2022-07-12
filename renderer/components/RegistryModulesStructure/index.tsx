import React, { FC } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { IRegistryModulesStructureProps } from './types'
import useBase from './useBase'
import RegistryModulesTable from '../RegistryModulesTable'

const RegistryModulesStructure: FC<IRegistryModulesStructureProps> = (props) => {
  const {
    modulesStructure,
    downloadedModules,
    downloadingModules,
    selectedModules,
    className,
    style,
    qa,
    onSelect,
    onSelectAll,
    onDownload,
    onRemove,
  } = props

  const { preparedStructure, structureOpened, modulesCounts, isEmpty, toggleModuleType, toggleModuleLang } =
    useBase(props)

  return (
    <div className={`flex w-full h-96 overflow-y-scroll ${className}`} style={style} data-qa={qa}>
      {isEmpty ? (
        <div className="flex items-center justify-center w-full h-full text-gray-600">Sorry, nothing found...</div>
      ) : (
        <ul className="w-full">
          {preparedStructure.map(({ type, label, languages }) =>
            languages.length > 0 ? (
              <li key={type} className="mb-2">
                <div className="sticky top-0 bg-white z-30">
                  <button
                    className="flex items-center w-full font-medium hover:bg-blue-100"
                    data-type={type}
                    onClick={toggleModuleType}
                  >
                    <ChevronRightIcon
                      className={`w-4 h-4 mr-1 transition-transform ${structureOpened[type]?.isOpen && 'rotate-90'}`}
                    />
                    <span>{label}</span>
                    <span className="ml-1 text-xs text-gray-400">({modulesCounts[type] ?? 0})</span>
                  </button>
                </div>
                {structureOpened[type]?.isOpen && (
                  <ul className="w-full">
                    {languages.map(({ lang, label: labelLang }) => (
                      <li key={lang} className="mb-2 pl-4">
                        <div className="sticky top-6 bg-white z-20">
                          <button
                            className={`flex items-center w-full font-normal hover:text-blue-600 ${
                              structureOpened[type]?.languages?.[lang]?.isOpen ? 'text-gray-900' : 'text-gray-600'
                            }`}
                            data-type={type}
                            data-lang={lang}
                            onClick={toggleModuleLang}
                          >
                            <ChevronRightIcon
                              className={`w-4 h-4 mr-1 transition-transform ${
                                structureOpened[type]?.languages?.[lang]?.isOpen && 'rotate-90'
                              }`}
                            />
                            <span>{labelLang}</span>
                            <span className="ml-1 text-xs text-gray-400">({modulesStructure[type][lang]?.length})</span>
                          </button>
                        </div>
                        {structureOpened[type]?.languages?.[lang]?.isOpen && (
                          <RegistryModulesTable
                            type={type}
                            lang={lang}
                            modules={modulesStructure[type][lang]}
                            downloadedModules={downloadedModules}
                            downloadingModules={downloadingModules}
                            selectedModules={selectedModules}
                            theadClassName="sticky top-12 z-10"
                            onSelect={onSelect}
                            onSelectAll={onSelectAll}
                            onDownload={onDownload}
                            onRemove={onRemove}
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  )
}

RegistryModulesStructure.defaultProps = {
  languagesISO6392: {},
  className: '',
}

export default RegistryModulesStructure
