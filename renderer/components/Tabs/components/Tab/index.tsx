import React, { FC } from 'react'
import { SIconWrapper, STab, STabLink } from './styled.index'
import { ITab } from '../../types'
import { Close } from '@material-ui/icons'

const Tab: FC<ITab> = ({ index, label, isActive, onActive, onClose }) => {
  return (
    <STab data-index={index} $isActive={isActive} onClick={onActive}>
      <STabLink>{label}</STabLink>
      <SIconWrapper>
        <Close fontSize="small" />
      </SIconWrapper>
    </STab>
  )
}

export default Tab
