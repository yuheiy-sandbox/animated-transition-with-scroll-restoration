import React from 'react'
import TransitionGroupPlus from 'react-transition-group-plus'
import Link from './Link'

export default class App extends React.Component {
  onResolve = () => {
    this.props.router.onResolve()
  }

  onBeforeDispose = () => {
    this.props.router.onBeforeDispose()
  }

  render() {
    const {children} = this.props

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
        {children && React.cloneElement(children, {
          onResolve: this.onResolve,
          onBeforeDispose: this.onBeforeDispose,
        })}
      </TransitionGroupPlus>
    </div>
  }
}
