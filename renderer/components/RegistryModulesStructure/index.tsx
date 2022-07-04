import React, { FC } from 'react'
import noop from 'helpers/noop'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { IRegistryModulesStructureProps } from './types'
import useBase from './useBase'
import RegistryModulesTable from '../RegistryModulesTable'

const RegistryModulesStructure: FC<IRegistryModulesStructureProps> = (props) => {
  const { modulesStructure, className, style, qa, onDownload } = props

  const { moduleTypeKeys, toggleModuleType } = useBase(props)

  return (
    <div className={`flex w-full h-96 overflow-y-scroll ${className}`} style={style} data-qa={qa}>
      <ul className="w-full">
        {moduleTypeKeys.map(({ type, label, isClosed }) => (
          <li key={type} className="mb-2">
            <div className="sticky top-0 bg-white z-10">
              <button className="flex items-center font-medium" data-type={type} onClick={toggleModuleType}>
                <ChevronRightIcon className={`w-4 h-4 mr-1 transition-transform ${!isClosed && 'rotate-90'}`} />
                <span>{label}</span>
              </button>
            </div>
            {!isClosed && (
              <RegistryModulesTable
                modules={modulesStructure[type].ru}
                theadClassName="sticky top-6 z-10"
                onDownload={onDownload}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

RegistryModulesStructure.defaultProps = {
  className: '',
}

export default RegistryModulesStructure
