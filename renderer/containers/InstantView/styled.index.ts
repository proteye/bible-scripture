import styled, { css } from 'styled-components'

export const SInstantView = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 250px;
    border-top: 1px solid ${theme.palette.gray};
  `,
)

export const SWrapper = styled.div(
  () => css`
    padding: 16px;
  `,
)
