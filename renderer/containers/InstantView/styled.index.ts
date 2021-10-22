import styled, { css } from 'styled-components'

export const SInstantView = styled.div(
  ({ theme }) => css`
    display: block;
    width: 100%;
    height: auto;
    padding: 16px;
    border-top: 1px solid ${theme.palette.gray};
  `,
)
