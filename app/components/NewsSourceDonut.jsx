const React = require('react')

const drawNewsSourceDonut = require('../visualizations/news-source-donut')

const NewsSourceDonut = React.createClass({
  componentDidMount: function() {
    drawNewsSourceDonut()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <div className="flexbox vis-title">
              <h2>Notícias por fonte</h2>
              <select id="news-source-selection">
                <option value="all" defaultValue>todas</option>
              </select>
          </div>

          <svg id="news-donut" height={visConfig.nsdcVisHeight} width={visConfig.nsdcVisWidth}></svg>
      </div>
    )
  }
})


module.exports = NewsSourceDonut