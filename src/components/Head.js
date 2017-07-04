import React from 'react'
import {Helmet} from 'react-helmet'

export default class Head extends React.Component {
  render() {
    const {isEnabled, title, description, canonical} = this.props

    if (!isEnabled) {
      return null
    }

    return <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  }
}
