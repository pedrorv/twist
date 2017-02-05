const React = require('react')


const drawNewsTimeSeries = require('../visualizations/news-time-series')

const NewsTimeSeries = React.createClass({
  componentDidMount: function() {
    drawNewsTimeSeries()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <div className="flexbox vis-title">
              <h2>Notícias sobre os candidatos</h2>
              <div className="vis-options">
                <p value="crivella" className="checkbutton active crivella">Crivella</p>
                <p value="freixo" className="checkbutton active freixo">Freixo</p>
              </div>
          </div>
          <svg id="news-time-series" height={visConfig.height} width={visConfig.width}></svg>          
      </div>
    )
  }
})


module.exports = NewsTimeSeries