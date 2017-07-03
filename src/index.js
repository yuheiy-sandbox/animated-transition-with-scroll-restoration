import 'web-animations-js'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import router from './router'
import history from './history'

const context = {
  saveScrollPosition: () => {
    console.log('saveScrollPosition')

    scrollPositionsHistory[currentComponentLocation.key] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    };

  },

  updateCurrentComponentLocation: () => {
    console.log('updateCurrentComponentLocation')
    currentComponentLocation = currentLocation;
  },

  onRenderComplete: () => {
    return onRenderComplete(currentRoute, currentLocation)
  }
};

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  console.log('initialRenderComplete')
  onRenderComplete = function renderComplete(route, location) {
    console.log('renderComplete')
    document.title = route.title;

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];
    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);
      if (targetHash) {
        const target = document.getElementById(targetHash);
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    window.scrollTo(scrollX, scrollY);

    // if (window.ga) {
    //   window.ga('send', 'pageview', createPath(location));
    // }
  };
};

let currentRoute
let currentLocation = history.location;
let currentComponentLocation = currentLocation

// Re-render the app when window.location changes
async function onLocationChange(location, action) {
  // Remember the latest scroll position for the previous location
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }
  currentLocation = location;

  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      ...context,
      path: location.pathname,
    });
    currentRoute = route

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return;
    }

    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }

    ReactDOM.render(
      <App context={context}>{route.component}</App>,
      document.getElementById('root'),
      // () => onRenderComplete(route, location),
    );
  } catch (error) {
    // if (__DEV__) {
    //   throw error;
    // }

    console.error(error);

    // Do a full page reload if error occurs during client-side navigation
    if (action && currentLocation.key === location.key) {
      window.location.reload();
    }
  }
}

history.listen(onLocationChange);
onLocationChange(currentLocation);

registerServiceWorker();
