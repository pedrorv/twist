const React = require('react')

const drawNewsSourceTimeLapse = require('../visualizations/news-source-time-lapse')

const NewsSourceTimeLapse = React.createClass({
  componentDidMount: function() {
    drawNewsSourceTimeLapse()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <div className="flexbox vis-title">
              <h2>Time lapse das notícias</h2>
              <div className="flexbox vis-controls">
                <p className="button play">Play</p>
                <p className="button pause">Pause</p>
                <p className="button back">Voltar</p>
                <p className="button forward">Avançar</p>
              </div>
          </div>
          
          <svg id="news-time-lapse" height={visConfig.nstlVisHeight} width={visConfig.nstlVisWidth}></svg>
      </div>
    )
  }
})


module.exports = NewsSourceTimeLapse