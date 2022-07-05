import React, { FC } from 'react'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { IRegistryModulesStructureProps } from './types'
import useBase from './useBase'
import RegistryModulesTable from '../RegistryModulesTable'

const RegistryModulesStructure: FC<IRegistryModulesStructureProps> = (props) => {
  const { modulesStructure, downloadedModules, className, style, qa, onDownload } = props

  const { preparedStructure, toggleModuleType, toggleModuleLang } = useBase(props)

  return (
    <div className={`flex w-full h-96 overflow-y-scroll ${className}`} style={style} data-qa={qa}>
      <ul className="w-full">
        {preparedStructure.map(({ type, label, languages, isOpen }) => (
          <li key={type} className="mb-2">
            <div className="sticky top-0 bg-white z-30">
              <button className="flex items-center font-medium" data-type={type} onClick={toggleModuleType}>
                <ChevronRightIcon className={`w-4 h-4 mr-1 transition-transform ${isOpen && 'rotate-90'}`} />
                <span>{label}</span>
              </button>
            </div>
            {isOpen && (
              <ul className="w-full">
                {languages.map(({ lang, label: labelLang, isOpen: isOpenLang }) => (
                  <li key={lang} className="mb-2 pl-4">
                    <div className="sticky top-6 bg-white z-20">
                      <button
                        className="flex items-center font-normal text-gray-700"
                        data-type={type}
                        data-lang={lang}
                        onClick={toggleModuleLang}
                      >
                        <ChevronRightIcon
                          className={`w-4 h-4 mr-1 transition-transform ${isOpenLang && 'rotate-90'}`}
                        />
                        <span>{labelLang}</span>
                      </button>
                    </div>
                    {isOpenLang && (
                      <RegistryModulesTable
                        modules={modulesStructure[type][lang]}
                        downloadedModules={downloadedModules}
                        theadClassName="sticky top-12 z-10"
                        onDownload={onDownload}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

RegistryModulesStructure.defaultProps = {
  languagesISO6392: {},
  className: '',
}

export default RegistryModulesStructure
