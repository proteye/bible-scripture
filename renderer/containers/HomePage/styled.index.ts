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
