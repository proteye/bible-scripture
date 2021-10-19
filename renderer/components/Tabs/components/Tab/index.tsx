import React, { FC } from 'react'
import { SIconWrapper, STab, STabLink } from './styled.index'
import { ITab } from '../../types'
import { Close } from '@material-ui/icons'
import { ETabType } from 'components/Tab/types'

const Tab: FC<ITab> = ({ index, label, type, isActive, children, onActive, onClose }) => {
  return (
    <STab data-index={index} $isActive={type === ETabType.tab && isActive} onClick={onActive}>
      {type === ETabType.tab ? <STabLink>{label}</STabLink> : children}
      {type === ETabType.tab && (
        <SIconWrapper onClick={onClose}>
          <Close fontSize="small" />
        </SIconWrapper>
      )}
    </STab>
  )
}

export default Tab
