const React = require('react')
const ReactDOM = require('react-dom')
const { Route, Router, IndexRoute, browserHistory } = require('react-router')

const Main = require('Main')
const Home = require('Home')

const WordCloud = require('WordCloud')
const NewsTimeSeries = require('NewsTimeSeries')
const NewsSourceDonut = require('NewsSourceDonut')
const NewsSourceTimeLapse = require('NewsSourceTimeLapse')

require('./styles/app.scss')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/twist" component={Main}>
      <Route path="palavras-frequentes" component={WordCloud} />
      <Route path="serie-temporal" component={NewsTimeSeries} />
      <Route path="fontes-donut" component={NewsSourceDonut} />
      <Route path="fontes-time-lapse" component={NewsSourceTimeLapse} />
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('app')
)