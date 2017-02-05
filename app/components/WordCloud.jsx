const React = require('react')

const drawWordCloud = require('../visualizations/word-cloud')

const WordCloud = React.createClass({
  componentDidMount: function() {
    drawWordCloud()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <div className="flexbox vis-title">
              <h2>Palavras frequentes em títulos de notícias</h2>
              <div className="vis-options">
                <p value="all" className="button active">Todas</p>
                <p value="crivella" className="button">Sobre o Crivella</p>
                <p value="freixo" className="button">Sobre o Freixo</p>
                <p value="draw" className="button">Empate entre os dois</p>
              </div>
          </div>
          <svg id="word-cloud" height={visConfig.height} width={visConfig.width}></svg>         
      </div>
    )
  }
})


module.exports = WordCloud