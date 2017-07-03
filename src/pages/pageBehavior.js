import React from 'react'

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

    render() {
      return <WrappedComponent
        ref={c => this.wrappedComponent = c}
        isVisible={this.state.isVisible} />
    }
  }
}

export default pageBehavior
