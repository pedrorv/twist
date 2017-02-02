const React = require('react')

const drawWordCloud = require('../visualizations/wordcloud')

const WordCloud = React.createClass({
  componentDidMount: function() {
    drawWordCloud()
  },
  render: function() {
    return (
      <div className="flexbox vis-holder">
          <svg id="word-cloud" height={visConfig.height} width={visConfig.width}></svg>
          <div className="vis-options">
            <h2>Palavras mais utilizadas nos títulos das notícias sobre os candidatos</h2>

            <p value="all" className="button active">Todas</p>
            <p value="crivella" className="button">Sobre o Crivella</p>
            <p value="freixo" className="button">Sobre o Freixo</p>
            <p value="draw" className="button">Empate no uso</p>
          </div>
      </div>
    )
  }
})


module.exports = WordCloud


// <div className="option">
//               <input id="word-cloud-none" type="radio" name="filterwc" value="none" checked />
//               <label for="word-cloud-none">Todas</label>
//             </div>
//             <div className="option">
//               <input id="word-cloud-crivella" type="radio" name="filterwc" value="crivella" />
//               <label for="word-cloud-crivella">Sobre o Crivella</label>
//             </div>
//             <div className="option">
//               <input id="word-cloud-freixo" type="radio" name="filterwc" value="freixo" />
//               <label for="word-cloud-freixo">Sobre o Freixo</label>
//             </div>
//             <div className="option">
//               <input id="word-cloud-both" type="radio" name="filterwc" value="ambos" />
//               <label for="word-cloud-both">Empate no uso</label>
//             </div>