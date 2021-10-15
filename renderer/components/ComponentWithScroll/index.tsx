import React, { FC } from 'react'
import { SComponentWithScroll } from './styled.index'
import { IComponentWithScrollProps } from './types'

const ComponentWithScroll: FC<IComponentWithScrollProps> = ({ dimensions, children }) => {
  return <SComponentWithScroll $dimensions={dimensions}>{children}</SComponentWithScroll>
}

export default ComponentWithScroll
