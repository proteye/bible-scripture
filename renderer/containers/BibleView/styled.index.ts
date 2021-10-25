import styled, { css } from 'styled-components'

export const SBibleView = styled.div(
  () => css`
    display: block;
    width: 100%;
    height: auto;
    padding: 16px;
  `,
)

export const SSearchPanel = styled.div(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    height: ${theme.searchBar.height};
    padding: 6px 12px;
    background-color: ${theme.palette.secondary};
  `,
)

export const SWord = styled.span(
  ({ theme }) => css`
    &:hover {
      background: ${theme.palette.secondary};
    }
  `,
)
