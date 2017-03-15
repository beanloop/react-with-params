import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import * as React from 'react'
import Router from 'react-router/MemoryRouter'
import {withParams} from './index'

describe('withParams', () => {
  it('should extract a single param', () => {
    const ShowName = withParams('name', {match: '/user/:name'})(({name}) =>
      <span>{name}</span>
    )

    const wrapper = render(
      <Router initialEntries={['/user/ben']}>
        <ShowName />
      </Router>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should extract multiple params', () => {
    const ShowIdAndName = withParams(['id', 'name'], {match: '/user/:id/:name'})(({id, name}) =>
      <span>{id} - {name}</span>
    )

    const wrapper = render(
      <Router initialEntries={['/user/1/ben']}>
        <ShowIdAndName />
      </Router>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should extract params with exactly false', () => {
    const ShowIdAndName = withParams(['id', 'name'], {
      match: '/user/:id/:name',
      exactly: false,
    })(({id, name}) =>
      <span>{id} - {name}</span>
    )

    const wrapper = render(
      <Router initialEntries={['/user/1/ben/the/third']}>
        <ShowIdAndName />
      </Router>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
