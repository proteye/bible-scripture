import { ISTab } from 'components/Tabs/types'
import styled, { css } from 'styled-components'

export const STabLink = styled.a(
  ({ theme }) => css`
    display: block;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    color: ${theme.palette.primary};
    cursor: default;
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
    padding-right: 24px;
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  `,
)

export const STab = styled.li<ISTab>(
  ({ $isActive, theme }) => css`
    display: inline-block;

    ${$isActive &&
    css`
      border-bottom: 2px solid ${theme.palette.secondary};

      ${STabLink} {
        color: ${theme.palette.secondary};
      }
    `}
  `,
)
