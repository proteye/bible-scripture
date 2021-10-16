import React, { FC } from 'react'
import { STab, STabLink } from './styled.index'
import { ITab } from '../../types'

const Tab: FC<ITab> = ({ index, label, isActive, onTab }) => {
  return (
    <STab data-index={index} $isActive={isActive} onClick={onTab}>
      <STabLink>{label}</STabLink>
    </STab>
  )
}

export default Tab
