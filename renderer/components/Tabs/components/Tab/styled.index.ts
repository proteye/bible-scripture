import { ISTab } from 'components/Tabs/types'
import styled, { css } from 'styled-components'

export const STabLink = styled.a(
  ({ theme }) => css`
    display: block;
    white-space: nowrap;
    text-transform: uppercase;
    font-weight: 500;
    font-size: ${theme.fontSizes.small};
    color: ${theme.palette.primary};
    cursor: default;
    height: ${theme.tabBar.height};
    line-height: ${theme.tabBar.height};
    padding-left: 36px;
    padding-right: 36px;
    user-select: none;

    &:hover {
      text-decoration: none;
    }
  `,
)

export const SIconWrapper = styled.span(
  () => css`
    position: absolute;
    right: 0;
    top: 50%;
    display: none;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    transform: translateY(-50%);

    &:hover {
      background-color: rgba(0, 0, 0, 0.15);
    }
  `,
)

export const STab = styled.li<ISTab>(
  ({ $isActive, theme }) => css`
    position: relative;
    display: inline-flex;
    align-items: center;

    &:hover {
      ${SIconWrapper} {
        display: block;
      }
    }

    ${$isActive &&
    css`
      border-bottom: 2px solid ${theme.palette.secondary};

      ${STabLink} {
        color: ${theme.palette.secondary};
      }
    `}
  `,
)
