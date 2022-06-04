import styled, { css } from 'styled-components'

import { IColorStyled, IInputStyled, IInputWrapperStyled, IPrefixStyled, TLabelStyled, TSuffixStyled } from './types'

import { media } from 'components/media'

export const LabelStyled = styled.span<TLabelStyled>(
  ({ theme, $shapeType, $inputSize, $type }) => css`
    display: block;
    width: 100%;
    margin: 0 0 8px 20px;
    color: ${theme.palette.textGray};
    font: ${theme.fontSystem.caption};

    ${($inputSize === 'small' || $inputSize === 'medium') &&
    css`
      margin-left: 16px;
    `}

    ${$type === 'search' &&
    $inputSize === 'medium' &&
    css`
      margin-left: 20px;
    `}

    ${$shapeType === 'underlined' &&
    css`
      margin-bottom: ${$inputSize === 'large' ? '-7px' : $inputSize === 'medium' ? '-4px' : '-3px'};
      margin-left: 0;

      ${($inputSize === 'small' || $type === 'search') &&
      css`
        margin-bottom: 0;
      `}
    `}
  `,
)

const inputFocusOutlined = css<IColorStyled>(
  ({ theme, $color }) => css`
    border-color: ${theme.palette[$color]};
  `,
)

const inputFocusUnderlined = css<IColorStyled>(
  ({ theme, $color }) => css`
    border-bottom-color: ${theme.palette[$color]};
  `,
)

export const InputStyled = styled.input<IInputStyled & IColorStyled>(
  ({ theme, isError, type, $inputSize, $shapeType, $focus }) => css`
    width: 100%;
    color: ${theme.palette.textGraphite};
    background-color: transparent;
    border: 1px solid ${theme.palette.border};
    outline: none;
    transition: border-color 0.2s ease-in-out;

    &:-webkit-autofill {
      color: ${theme.palette.textGraphite};
      -webkit-text-fill-color: ${theme.palette.textGraphite};
      -webkit-box-shadow: inset 0 0 0 50px ${theme.palette.white};
    }

    &::placeholder {
      color: ${theme.palette.textGray};
    }

    ${$focus && inputFocusOutlined}

    &:not(:read-only) {
      &:hover,
      &:focus-visible {
        ${inputFocusOutlined}
      }
    }

    &:not(:read-only):focus {
      & + ${LabelStyled} {
        color: ${isError ? theme.palette.red : theme.palette.textGray};
      }
    }

    ${$inputSize === 'small' &&
    css`
      height: ${theme.input.small.height};
      padding: 0 16px;
      font: ${theme.fontSystem.extraSmall};
      line-height: ${theme.input.small.height};
      border-radius: ${theme.input.small.borderRadius};
    `}

    ${$inputSize === 'medium' &&
    css`
      height: ${theme.input.medium.height};
      padding: ${`0 16px 0 ${type === 'search' ? '24px' : '16px'}`};
      font: ${theme.fontSystem.small};
      line-height: ${theme.input.medium.height};
      border-radius: ${theme.input.medium.borderRadius};
    `}

    ${$inputSize === 'large' &&
    css`
      height: ${theme.input.large.height};
      padding: 0 20px;
      font: ${theme.fontSystem.middle};
      line-height: ${theme.input.large.height};
      border-radius: ${theme.input.large.borderRadius};
    `}

    ${$shapeType === 'underlined' &&
    css`
      padding: 0;
      border-color: transparent;
      border-width: 0;
      border-bottom: 1px solid ${theme.palette.border};
      border-radius: 0;

      ${$focus && inputFocusUnderlined}

      &:not(:disabled) {
        &:hover,
        &:focus-visible {
          ${inputFocusUnderlined}
        }
      }
    `}
  `,
)

export const PrefixStyled = styled.span<IPrefixStyled>(
  ({ $inputSize, $shapeType }) => css`
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    ${$shapeType !== 'underlined' &&
    css`
      width: 52px;
      padding-left: 12px;
    `}

    ${$inputSize === 'small' &&
    $shapeType !== 'underlined' &&
    css`
      width: 42px;
    `}

    ${$inputSize === 'medium' &&
    $shapeType !== 'underlined' &&
    css`
      width: 48px;
    `}
  `,
)

export const SuffixStyled = styled.span<TSuffixStyled>(
  ({ $inputSize, $shapeType, $isLMS }) => css`
    position: absolute;
    right: 0;
    bottom: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-right: ${() => {
      if ($inputSize === 'small') {
        if ($shapeType === 'underlined') {
          return '8px'
        }

        return '12px'
      }

      if ($inputSize === 'medium') {
        if ($shapeType === 'underlined') {
          return '12px'
        }

        return '16px'
      }

      return '20px'
    }};

    ${media.less('xl')} {
      padding-right: ${() => {
        if ($isLMS) {
          return $shapeType === 'outlined' ? '4px' : 0
        }

        return '8px'
      }};
    }
  `,
)

export const InputWrapperStyled = styled.span<IInputWrapperStyled>(
  ({ $inputSize, $hasPrefix, $shapeType }) => css`
    position: relative;
    display: inline-flex;
    flex-flow: row;

    ${$hasPrefix &&
    css`
      ${InputStyled} {
        padding-left: ${() => {
          if ($inputSize === 'small') {
            if ($shapeType === 'underlined') {
              return '28px'
            }

            return '42px'
          }

          if ($inputSize === 'medium') {
            if ($shapeType === 'underlined') {
              return '32px'
            }

            return '48px'
          }

          return '52px'
        }};
      }
    `}
  `,
)

export const WrapperStyled = styled.label<IInputStyled>(
  ({ theme, isActive, isError, $shapeType, readOnly }) => css`
    position: relative;
    display: inline-flex;
    flex-flow: column;
    min-width: 164px;

    ${isActive &&
    css`
      ${LabelStyled} {
        color: ${theme.palette.textGray};
      }
    `}

    ${isError &&
    css`
      ${InputStyled} {
        &,
        &:hover,
        &:focus-visible {
          border-color: ${theme.palette.red};
        }
      }

      ${$shapeType === 'underlined' &&
      css`
        border-color: transparent;

        ${InputStyled} {
          &,
          &:hover,
          &:focus-visible {
            border-bottom-color: ${theme.palette.red};
          }
        }
      `}
    `}

  ${readOnly &&
    css`
      ${LabelStyled} {
        color: ${theme.palette.textGray};
      }

      ${InputStyled} {
        color: ${theme.palette.darkTextGray};
        border-color: ${theme.palette.disabled};
        border-style: dashed;

        &::placeholder {
          color: ${theme.palette.textGray};
        }
      }

      ${$shapeType === 'underlined' &&
      css`
        border-color: transparent;

        ${InputStyled} {
          border-bottom-color: ${theme.palette.disabled};
        }
      `}
    `}
  `,
)

export const RootStyled = styled.div(
  () => css`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
  `,
)

export const HintStyled = styled.span<IInputStyled>(
  ({ theme, isError, $shapeType }) => css`
    margin-top: 8px;
    padding: 0 20px;
    color: ${theme.palette.textGray};
    font: ${theme.fontSystem.caption};

    ${media.xl} {
      font: ${theme.font.desktop.p3};
    }

    ${isError &&
    css`
      color: ${theme.palette.pink};
    `}

    ${$shapeType === 'underlined' &&
    css`
      padding-left: 0;
    `}
  `,
)
