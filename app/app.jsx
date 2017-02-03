const React = require('react')
const ReactDOM = require('react-dom')
const { Route, Router, IndexRoute, browserHistory } = require('react-router')

const Main = require('Main')
const Home = require('Home')
const About = require('About')

const WordCloud = require('WordCloud')
const NewsTimeSeries = require('NewsTimeSeries')

require('./styles/app.scss')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/twist" component={Main}>
      <Route path="palavras-frequentes" component={WordCloud} />
      <Route path="serie-temporal" component={NewsTimeSeries} />
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('app')
)