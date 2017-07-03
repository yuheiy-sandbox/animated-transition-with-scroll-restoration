import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

const routes = [
  {
    path: '/',
    action: ({path}) => {
      return {
        title: 'home',
        component: <Home key={path} />
      }
    }
  }, {
    path: '/about',
    action: ({path}) => {
      return {
        title: 'about',
        component: <About key={path} />
      }
    }
  }, {
    path: '/contact',
    action: ({path}) => {
      return {
        title: 'contact',
        component: <Contact key={path} />
      }
    }
  }
]

export default routes
