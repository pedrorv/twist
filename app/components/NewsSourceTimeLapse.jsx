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
      </div>
    )
  }
})


module.exports = NewsSourceTimeLapse