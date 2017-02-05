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
              <div className="flexbox controls">
                <button className="play">Play</button>
                <button className="pause">Pause</button>
                <button className="back">Voltar</button>
                <button className="forward">Avançar</button>
              </div>
          </div>
          
          <svg id="news-time-lapse" height={visConfig.height} width={visConfig.width}></svg>
      </div>
    )
  }
})


module.exports = NewsSourceTimeLapse