import React from 'react'
import renderer from 'react-test-renderer'
import Link from '../components/Link'

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as renderer.ReactTestRendererJSON
}

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://antfu.me">Anthony Fu</Link>,
  )
  let tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onMouseEnter()

  // re-rendering
  tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onMouseLeave()
  // re-rendering
  tree = toJson(component)
  expect(tree).toMatchSnapshot()
})

//Next
import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from '../pages'

test('home', () => {
  render(<Home />)
  const main = within(screen.getByRole('main'))
  expect(main.getByRole('heading', { level: 1, name: /welcome to next\.js!/i })).toBeDefined()

  const footer = within(screen.getByRole('contentinfo'))
  const link = within(footer.getByRole('link'))
  expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined()
})