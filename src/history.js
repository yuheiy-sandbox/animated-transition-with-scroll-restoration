import createBrowserHistory from 'history/createBrowserHistory'

const isBrowser = typeof window !== 'undefined'
export default isBrowser && createBrowserHistory()
