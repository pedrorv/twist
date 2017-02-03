const React = require('react')

const drawWordCloud = require('../visualizations/word-cloud')

const WordCloud = React.createClass({
  componentDidMount: function() {
    drawWordCloud()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <svg id="word-cloud" height={visConfig.height} width={visConfig.width}></svg>
          
          <h2>Palavras mais utilizadas em títulos de notícias sobre os candidatos</h2>
          
          <div className="vis-options">
            <p value="all" className="button active">Todas</p>
            <p value="crivella" className="button">Notícias sobre o Crivella</p>
            <p value="freixo" className="button">Notícias sobre o Freixo</p>
            <p value="draw" className="button">Empate entre os dois</p>
          </div>
      </div>
    )
  }
})


module.exports = WordCloud