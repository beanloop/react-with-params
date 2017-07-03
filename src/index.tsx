import {parse} from 'querystring'
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

function extractQueryParams(queryParamNames, queryString) {
  return extractParams(queryParamNames, parse(queryString.substr(1)))
}

export type Options = {
  params?: string|Array<string>,
  match?: string
  exactly?: boolean
  state?: string|Array<string>
  routeComponent?: ReactType
  routeProps?: any
  queryParams?: string|Array<string>
}

/**
 * HOC for extracting router params.
 *
 * Example:
 *
 * ```typescript
 * const ShowName = withParams({params: 'name', match: '/user/:name'})(({name}) =>
 *   <span>{name}</span>
 * )
 * ```
 *
 * ```typescript
 * const ShowIdAndName = withParams({params: ['id', 'name'], match: '/user/:id/:name'})(({id, name}) =>
 *   <span>{id}{name}</span>
 * )
 * ```
 */
export const withParams = (
  {
    params: paramsNames, match, exactly = true,
    state, routeComponent: Route = DefaultRoute,
    routeProps, queryParams,
  }: Options = {}
) => WrappedComponent => {
  const displayName = wrapDisplayName(WrappedComponent, 'withParams')

  paramsNames = Array.isArray(paramsNames) ? paramsNames : [paramsNames]
  queryParams = Array.isArray(queryParams) ? queryParams : [queryParams]

  if (state) {
    state = Array.isArray(state) ? state : [state]
  }

  if (match) {
    return setDisplayName(displayName)(props =>
      <Route {...routeProps} exact={exactly} path={match} render={({match: {params} = {params: []}, location}) =>
        <WrappedComponent {...props}
          {...extractParams(paramsNames, params)}
          {...extractParams(state, location.state)}
          {...extractQueryParams(queryParams, location.search)}
        />
      } />
    )
  }

  return setDisplayName(displayName)(
    props => <WrappedComponent {...props} {...extractParams(paramsNames, props.params)} />
  )
}
