import 'web-animations-js'
import React from 'react'
import ReactDOM from 'react-dom'
// import {createPath} from 'history/PathUtils'
import router from './router'
import history from './history'
import App from './components/App'
import './index.css'

const scrollPositionsHistory = new Map()
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  console.log('initialRenderComplete')

  onRenderComplete = function renderComplete(route, location) {
    console.log('renderComplete')
    document.title = route.title

    let scrollX = 0
    let scrollY = 0
    const pos = scrollPositionsHistory.get(location.key)
    if (pos) {
      scrollX = pos.scrollX
      scrollY = pos.scrollY
    } else {
      const targetHash = location.hash.slice(1)
      if (targetHash) {
        const target = document.getElementById(targetHash)
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top
        }
      }
    }

    window.scrollTo(scrollX, scrollY)

    // if (window.ga) {
    //   window.ga('send', 'pageview', createPath(location))
    // }
  }
}

let currentLocation = history.location
let currentComponentLocation = currentLocation
let currentRoute

const appProps = {
  router: {
    onResolve: () => {
      onRenderComplete(currentRoute, currentLocation)
    },
    onBeforeDispose: () => {
      scrollPositionsHistory.set(currentComponentLocation.key, {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
      })
      currentComponentLocation = currentLocation
    },
  }
}
const mountEl = document.getElementById('root')

async function onLocationChange(location, action) {
  if (action === 'PUSH') {
    scrollPositionsHistory.delete(location.key)
  }
  currentLocation = location

  try {
    const route = await router.resolve({
      path: location.pathname,
    })
    currentRoute = route

    if (currentLocation.key !== location.key) {
      return
    }

    // if (route.redirect) {
    //   history.replace(route.redirect)
    //   return
    // }

    ReactDOM.render(
      <App {...appProps}>{route.component}</App>,
      mountEl,
    )
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error
    }

    console.error(error)

    if (action && currentLocation.key === location.key) {
      window.location.reload()
    }
  }
}

history.listen(onLocationChange)
onLocationChange(currentLocation)
