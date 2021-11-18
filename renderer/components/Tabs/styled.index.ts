import styled, { css } from 'styled-components'
import { ISTab } from './types'

export const STabs = styled.div(
  () => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  `,
)

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
    position: relative;
    display: ${$isActive ? 'flex' : 'none'};
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
  `,
)
