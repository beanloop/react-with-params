import {render} from 'enzyme'
import toJson from 'enzyme-to-json'
import * as React from 'react'
import Router from 'react-router/MemoryRouter'
import {withParams} from './index'

describe('withParams', () => {
  it('should extract a single param', () => {
    const ShowName = withParams({params: 'name', match: '/user/:name'})(({name}) =>
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
    const ShowIdAndName = withParams({params: ['id', 'name'], match: '/user/:id/:name'})(({id, name}) =>
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
    const ShowIdAndName = withParams({
      params: ['id', 'name'],
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

  it('should extract a single query parameter', () => {
    const Display = withParams({
      queryParams: 'next',
      match: '/users',
    })(({next}) =>
      <span>{next}</span>
    )

    const wrapper = render(
      <Router initialEntries={['/users?next=/login']}>
        <Display />
      </Router>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should extract multiple query parameters', () => {
    const Display = withParams({
      queryParams: ['next', 'timestamp'],
      match: '/users',
    })(({next, timestamp}) =>
      <span>{next} - {timestamp}</span>
    )

    const wrapper = render(
      <Router initialEntries={['/users?next=/login&timestamp=1489995623368']}>
        <Display />
      </Router>
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
