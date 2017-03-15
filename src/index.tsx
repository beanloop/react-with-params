import * as React from 'react'
import {ReactType} from 'react'
import DefaultRoute from 'react-router/Route'
import setDisplayName from 'recompose/setDisplayName'
import wrapDisplayName from 'recompose/wrapDisplayName'

function extractParams(names, params) {
  if (!names || !params) return
  const newProps = {params}

  for (const name of names) {
    newProps[name] = params[name]
  }

  return newProps
}

export type Options = {
  match?: string
  exactly?: boolean
  state?: string|Array<string>
  routeComponent?: ReactType
  routeProps?: any
}

/**
 * HOC for extracting router params.
 *
 * Example:
 *
 * ```
 * const ShowName = withParams('name', {match: '/user/:name'})(({name}) =>
 *   <span>{name}</span>
 * )
 * ```
 */
export const withParams = (names, {match, exactly = true, state, routeComponent: Route = DefaultRoute, routeProps}: Options = {}) => WrappedComponent => {
  const displayName = wrapDisplayName(WrappedComponent, 'withParams')

  names = Array.isArray(names) ? names : [names]
  if (state) {
    state = Array.isArray(state) ? state : [state]
  }

  if (match) {
    return setDisplayName(displayName)(props =>
      <Route {...routeProps} exact={exactly} path={match} render={({match: {params} = {params: []}, location}) =>
        <WrappedComponent {...props} {...extractParams(names, params)} {...extractParams(state, location.state)} />
      } />
    )
  }

  return setDisplayName(displayName)(
    props => <WrappedComponent {...props} {...extractParams(names, props.params)} />
  )
}
