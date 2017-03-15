# react-with-params
[![Build Status](https://travis-ci.org/beanloop/react-with-params.svg?branch=master)](https://travis-ci.org/beanloop/react-with-params)
[![npm version](https://badge.fury.io/js/react-with-params.svg)](https://badge.fury.io/js/react-with-params)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

React HOC for extracting router params.

## Install
```
yarn add react-with-params
npm install --save react-with-params
```

## Usage
```typescript
import Route from 'react-router/Route'
import {withParams} from 'react-with-params'

const ShowName = withParams('name', {match: '/user/:name'})(({name}) =>
  <span>{name}</span>
)

<Route exact path='/user/:name' component={ShowName} />
```

```typescript
import Route from 'react-router/Route'
import {withParams} from 'react-with-params'

const ShowNameAndId = withParams(['name', 'id'], {match: '/user/:name/:id'})(({name, id}) =>
  <span>{id} - {name}</span>
)

<Route exact path='/user/:name/:id' component={ShowNameAndId} />
```

## License
react-with-params is dual-licensed under Apache 2.0 and MIT
terms.
