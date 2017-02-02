const React = require('react')
const ReactDOM = require('react-dom')
const { Route, Router, IndexRoute, browserHistory } = require('react-router')
const Main = require('Main')
const Home = require('Home')
const About = require('About')

require('./styles/app.scss')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/twist" component={Main}>
      <Route path="/about" component={About} />
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('app')
)