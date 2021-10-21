import styled, { css } from 'styled-components'

export const SContainer = styled.div(
  () => css`
    display: block;
    width: 100%;
    height: 100%;
  `,
)

export const SContent = styled.div(
  ({ theme }) => css`
    position: relative;
    display: block;
    width: 100%;
    height: calc(100vh - ${theme.appBar.height});
    overflow: hidden;
  `,
)

export const STopPanel = styled.div(
  ({ theme }) => css`
    display: flex;
    width: 100%;
    height: 36px;
    padding: 6px 12px;
    background-color: ${theme.palette.secondary};
  `,
)
