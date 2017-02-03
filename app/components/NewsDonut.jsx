const React = require('react')

const VisTitle = require('VisTitle')

const drawNewsDonut = require('../visualizations/news-donut')

const NewsDonut = React.createClass({
  componentDidMount: function() {
    drawNewsDonut()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <VisTitle title="Notícias por fonte" />
          <svg id="news-donut" height={visConfig.height} width={visConfig.width}></svg>
      </div>
    )
  }
})


module.exports = NewsDonut