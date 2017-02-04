const React = require('react')

const VisTitle = require('VisTitle')

const drawNewsSourceTimeLapse = require('../visualizations/news-source-time-lapse')

const NewsSourceTimeLapse = React.createClass({
  componentDidMount: function() {
    drawNewsSourceTimeLapse()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <VisTitle title="Time lapse notícias" />
          <svg id="news-time-lapse" height={visConfig.height} width={visConfig.width}></svg>
          <div className="flexbox controls">
            <button className="play">Play</button>
            <button className="pause">Pause</button>
            <button className="back">Voltar</button>
            <button className="forward">Avançar</button>
          </div>
      </div>
    )
  }
})


module.exports = NewsSourceTimeLapse