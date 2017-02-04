const React = require('react')

const VisTitle = require('VisTitle')

const drawNewsTimeSeries = require('../visualizations/news-time-series')

const NewsTimeSeries = React.createClass({
  componentDidMount: function() {
    drawNewsTimeSeries()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <VisTitle title="Notícias sobre os candidatos" />
          <svg id="news-time-series" height={visConfig.height} width={visConfig.width}></svg>

          <div className="vis-options">
            <p value="crivella" className="checkbutton active crivella">Crivella</p>
            <p value="freixo" className="checkbutton active freixo">Freixo</p>
          </div>
      </div>
    )
  }
})


module.exports = NewsTimeSeries