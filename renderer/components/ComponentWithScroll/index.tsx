import React, { FC } from 'react'
import { SComponentWithScroll } from './styled.index'
import { IComponentWithScrollProps } from './types'

const ComponentWithScroll: FC<IComponentWithScrollProps> = ({ dimensions, className, style, qa, children }) => {
  return <SComponentWithScroll $dimensions={dimensions} className={className} style={style} data-qa={qa}>{children}</SComponentWithScroll>
}

export default ComponentWithScroll
