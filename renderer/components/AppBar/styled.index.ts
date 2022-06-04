import styled, { css } from 'styled-components'
import { Appbar } from 'muicss/react'

const bgColor = 'linear-gradient(0deg, #b0bec5 0%, #eceff1 100%)'

export const SAppbar = styled(Appbar)(
  ({ theme }) => css`
    display: flex;
    background: ${bgColor};
    color: ${theme.palette.primary};
    height: ${theme.appBar.height};
    border-bottom: 1px solid ${theme.palette.gray};
    box-sizing: border-box;
  `,
)
