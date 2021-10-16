import styled, { css } from 'styled-components'
import { ISTab } from './types'

export const STabs = styled.div(() => css``)

export const STabsUl = styled.ul(
  () => css`
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
    background-color: transparent;
    white-space: nowrap;
    overflow-x: auto;
  `,
)

export const STabsPane = styled.div<ISTab>(
  ({ $isActive }) => css`
    display: none;

    ${$isActive &&
    css`
      display: block;
    `}
  `,
)
