import React from 'react'
import UniversalRouter from 'universal-router'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'

const routes = [
  {
    path: '/',
    action: ({path}) => {
      return {
        title: 'home',
        component: <HomePage key={path} />
      }
    }
  }, {
    path: '/about',
    action: ({path}) => {
      return {
        title: 'about',
        component: <AboutPage key={path} />
      }
    }
  }, {
    path: '/contact',
    action: ({path}) => {
      return {
        title: 'contact',
        component: <ContactPage key={path} />
      }
    }
  }
]

export default new UniversalRouter(routes)
