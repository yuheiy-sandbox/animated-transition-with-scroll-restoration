import React from 'react'
import {findDOMNode} from 'react-dom'
import pageBehavior from './pageBehavior'

class Home extends React.Component {
  async animateAppear() {
    const anim = findDOMNode(this).animate({
      opacity: [0, 1],
    }, {
      duration: 1600,
    })
    await new Promise(resolve => anim.onfinish = resolve)
  }

  async animateEnter() {
    const anim = findDOMNode(this).animate({
      opacity: [0, 1],
    }, {
      duration: 1600,
    })
    await new Promise(resolve => anim.onfinish = resolve)
  }

  async animateLeave() {
    const anim = findDOMNode(this).animate({
      opacity: [1, 0],
    }, {
      duration: 1600,
    })
    await new Promise(resolve => anim.onfinish = resolve)
  }

  render() {
    const {isVisible} = this.props

    return <div hidden={!isVisible}>
      {this.props.renderHead()}

      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At hic delectus corporis sequi, explicabo sunt neque iure nostrum earum, veritatis culpa tempora necessitatibus atque quam inventore sint provident iste? At.</p>
    </div>
  }
}

export default pageBehavior(Home)
