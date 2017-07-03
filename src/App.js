import React from 'react'
import TransitionGroupPlus from 'react-transition-group-plus'
import Link from './components/Link'
import PropTypes from 'prop-types'
import history from './history'

export default class App extends React.Component {
  static childContextTypes = {
    saveScrollPosition: PropTypes.any,
    updateCurrentComponentLocation: PropTypes.any,
    onRenderComplete: PropTypes.any,
  }

  getChildContext() {
    return this.props.context
  }

  componentDidMount() {
    console.log('App mounted')
  }

  render() {
    return <div>
      <div>app</div>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        <li>
          <Link to="/contact">contact</Link>
        </li>
      </ul>

      <TransitionGroupPlus component="div" transitionMode="out-in">
        {this.props.children}
      </TransitionGroupPlus>

    </div>
  }
}
