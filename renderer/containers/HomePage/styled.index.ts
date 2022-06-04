import styled, { css } from 'styled-components'

export const SContainer = styled.div(
  () => css`
    display: flex;
    width: 100%;
    height: 100%;
  `,
)

export const SContent = styled.div(
  ({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - ${theme.appBar.height});
    overflow: hidden;
  `,
)

export const SMainView = styled.div(
  () => css`
    display: flex;
    flex-direction: column:
    flex: 1;
    width: 100%;
    height: 100%;
  `,
)
