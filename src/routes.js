import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

const routes = [
  {
    path: '/',
    action: ({path}) => {
      return {
        component: <Home
          key={path}
          title="home"
          description="this is home"
          canonical={path}
        />
      }
    }
  }, {
    path: '/about',
    action: ({path}) => {
      return {
        component: <About
          key={path}
          title="about"
          description="this is about"
          canonical={path}
        />
      }
    }
  }, {
    path: '/contact',
    action: ({path}) => {
      return {
        component: <Contact
          key={path}
          title="contact"
          description="this is contact"
          canonical={path}
        />
      }
    }
  }
]

export default routes
