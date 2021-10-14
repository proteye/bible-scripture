import styled, { css } from 'styled-components'

export const MyButton = styled.button(
  ({ theme }) => css`
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
    border: 0;
    border-radius: 3px;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
    color: ${theme.palette.primary.main};
    height: 48px;
    padding: 0 30px;
    margin: 16px;
  `,
)
