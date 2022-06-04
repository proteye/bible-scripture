import React from 'react'
import { cleanup, fireEvent } from '@testing-library/react'

import { JestReactTestingLibraryRenderWithTheme } from '../../../../../jest/JestReactTestingLibraryRenderWithTheme'
import mock from '../../../mock/cities.mock'
import Droplist from '../index'

describe('@dasreda/components/Droplist', () => {
  afterEach(cleanup)

  let onSelect = jest.fn()

  beforeEach(() => {
    onSelect = jest.fn()
  })

  test('Droplist: small', () => {
    const { container } = JestReactTestingLibraryRenderWithTheme(
      <Droplist items={mock.citiesLong} size="small" onSelect={onSelect} close={jest.fn} />,
    )

    expect(container).toMatchSnapshot()
  })

  test('Droplist: medium', () => {
    const { container } = JestReactTestingLibraryRenderWithTheme(
      <Droplist items={mock.citiesLong} size="medium" onSelect={onSelect} close={jest.fn} />,
    )

    expect(container).toMatchSnapshot()
  })

  test('Droplist: large', () => {
    const { container } = JestReactTestingLibraryRenderWithTheme(
      <Droplist items={mock.citiesLong} size="large" onSelect={onSelect} close={jest.fn} />,
    )

    expect(container).toMatchSnapshot()
  })

  test('Droplist: small with `value`', () => {
    const { container } = JestReactTestingLibraryRenderWithTheme(
      <Droplist
        items={mock.citiesLong}
        size="small"
        value={mock.citiesLong[0].value}
        onSelect={onSelect}
        close={jest.fn}
      />,
    )

    expect(container).toMatchSnapshot()
  })

  test('Droplist: medium with `onSelect`', () => {
    const { container, getAllByText } = JestReactTestingLibraryRenderWithTheme(
      <Droplist
        items={mock.citiesLong}
        size="medium"
        value={mock.citiesLong[0].value}
        onSelect={onSelect}
        close={jest.fn}
      />,
    )

    const someItem = getAllByText('Йошкар-Ола')[0]

    expect(someItem).toBeTruthy()

    fireEvent.click(someItem)

    expect(onSelect).toHaveBeenCalled()

    expect(container).toMatchSnapshot()
  })
})
