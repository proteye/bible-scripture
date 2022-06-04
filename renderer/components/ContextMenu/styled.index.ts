import { IStyledThemeWithVisible } from 'components/types'
import styled, { css } from 'styled-components'

export const SSelect = styled.select<IStyledThemeWithVisible>(
  () => css`
    display: block;
    appearance: none;
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    outline: none;
    user-select: none;

    &::-ms-expand {
      display: none;
    }
  `,
)

export const SContextMenu = styled.div(
  () => css`
    display: block;
    padding: 0 16px;
  `,
)
