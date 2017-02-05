const React = require('react')
const ReactDOM = require('react-dom')
const { Route, Router, IndexRoute, browserHistory } = require('react-router')

const Main = require('Main')
const Home = require('Home')

const TemporalAnalysis = require('TemporalAnalysis')
const FrequencyAnalysis = require('FrequencyAnalysis')

require('./styles/app.scss')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/twist" component={Main}>
      <Route path="analises-temporais" component={TemporalAnalysis} />
      <Route path="analises-frequencia" component={FrequencyAnalysis} />
      <IndexRoute component={Home} />
    </Route>
  </Router>,
  document.getElementById('app')
)