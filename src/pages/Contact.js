import React from 'react'
import {findDOMNode} from 'react-dom'
import PropTypes from 'prop-types'

export default class ContactPage extends React.Component {
  static contextTypes = {
    saveScrollPosition: PropTypes.any,
    updateCurrentComponentLocation: PropTypes.any,
    onRenderComplete: PropTypes.any,
  }

  state = {
    isVisible: false,
  }

  async componentWillAppear(cb) {
    await new Promise(resolve => this.setState({isVisible: true}, resolve))
    this.context.onRenderComplete()
    let anim = findDOMNode(this).animate({
      opacity: [0, 1]
    }, {
      duration: 800,
    })
    anim.onfinish = () => {
      console.log('finish')
      cb()
    }
  }

  async componentWillEnter(cb) {
    await new Promise(resolve => this.setState({isVisible: true}, resolve))
    this.context.onRenderComplete()
    let anim = findDOMNode(this).animate({
      opacity: [0, 1]
    }, {
      duration: 800,
    })
    anim.onfinish = () => {
      console.log('finish')
      cb()
    }

  }

  componentWillLeave(cb) {
    let anim = findDOMNode(this).animate({
      opacity: [1, 0]
    }, {
      duration: 800,
    })
    anim.onfinish = () => {
      console.log('finish')
      this.context.saveScrollPosition()
      this.context.updateCurrentComponentLocation()
      cb()
    }
  }

  componentDidMount() {
  }

  render() {
    return <div style={this.state.isVisible ? {} : {display: 'none'}}>
      <h1>Contact</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
    </div>
  }
}
