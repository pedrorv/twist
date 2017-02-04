const React = require('react')

const VisTitle = require('VisTitle')

const drawNewsDonut = require('../visualizations/news-source-donut')

const NewsSourceDonut = React.createClass({
  componentDidMount: function() {
    drawNewsSourceDonut()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <VisTitle title="Notícias por fonte" />
          <svg id="news-donut" height={visConfig.height} width={visConfig.width}></svg>
          <select id="news-source-selection">
            <option value="all" defaultValue>Todos</option>
          </select>
      </div>
    )
  }
})


module.exports = NewsSourceDonut