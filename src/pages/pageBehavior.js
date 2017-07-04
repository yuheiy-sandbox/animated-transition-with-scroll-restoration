import React from 'react'
import Head from '../components/Head'

const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName ||
  WrappedComponent.name ||
  'Component'

const pageBehavior = (WrappedComponent) => {
  return class PageBehavior extends React.Component {
    static displayName = `PageBehavior(${getDisplayName(WrappedComponent)})`

    state = {
      isVisible: false,
    }

    async componentWillAppear(callback) {
      await new Promise(resolve => this.setState({isVisible: true}, resolve))
      this.props.onResolve()
      if (this.wrappedComponent.animateAppear) {
        await this.wrappedComponent.animateAppear()
      }
      callback()
    }

    async componentWillEnter(callback) {
      await new Promise(resolve => this.setState({isVisible: true}, resolve))
      this.props.onResolve()
      if (this.wrappedComponent.animateEnter) {
        await this.wrappedComponent.animateEnter()
      }
      callback()
    }

    async componentWillLeave(callback) {
      if (this.wrappedComponent.animateLeave) {
        await this.wrappedComponent.animateLeave()
      }
      callback()
    }

    componentDidLeave() {
      this.props.onBeforeDispose()
    }

    renderHead = () => {
      const {isSsr, title, description, canonical} = this.props
      const {isVisible} = this.state

      return <Head
        isEnabled={isSsr || isVisible}
        title={title}
        description={description}
        canonical={canonical}
      />
    }

    render() {
      const {onResolve, onBeforeDispose, ...props} = this.props

      return <WrappedComponent
        {...props}
        ref={c => this.wrappedComponent = c}
        isVisible={this.state.isVisible}
        renderHead={this.renderHead} />
    }
  }
}

export default pageBehavior
