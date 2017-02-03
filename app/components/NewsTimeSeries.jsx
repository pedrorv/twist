const React = require('react')

const drawNewsTimeSeries = require('../visualizations/news-time-series')

const NewsTimeSeries = React.createClass({
  componentDidMount: function() {
    drawNewsTimeSeries()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <svg id="news-time-series" height={visConfig.height} width={visConfig.width}></svg>

          <div className="vis-options">
            <p value="crivella" className="checkbutton active crivella">Notícias sobre o Crivella</p>
            <p value="freixo" className="checkbutton active freixo">Notícias sobre o Freixo</p>
          </div>
      </div>
    )
  }
})


module.exports = NewsTimeSeries