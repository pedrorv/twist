// Based on http://bl.ocks.org/jwhitfieldseed/9697914

const d3 = require('d3')
const { environmentUrl, capitalize } = require('../utilities')

d3.layout.cloud = require('d3.layout.cloud')

function drawWordCloud () {

  if (visConfig.frequentWords === undefined) {
    d3.json(environmentUrl('js/frequent-words.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.frequentWords = json.filter((word) => word.count > 10)
      showVis()
    });
  } else {
    showVis()
  }


  function showVis() {

    function wordSizeScale(data) {
      return d3.scale.linear()
                     .domain([d3.min(data, d => d.count), d3.max(data, d => d.count)])
                     .range([visConfig.wcMinWordFontSize, visConfig.wcMaxWordFontSize])
    }
    
    let myWordCloud = wordCloud()
    myWordCloud.update(visConfig.frequentWords)

    d3.selectAll('p.button')
      .on('click', function() {
        let button = d3.select(this)
        d3.selectAll('p.button').classed('active', false)
        button.classed('active', true)

        switch (button.attr("value")) {
          case "all":
            myWordCloud.update(visConfig.frequentWords)
            break;
          case "crivella":
            myWordCloud.update(visConfig.frequentWords.filter((word) => word['candidato']['Crivella'] > word['candidato']['Freixo']))
            break;
          case "freixo":
            myWordCloud.update(visConfig.frequentWords.filter((word) => word['candidato']['Freixo'] > word['candidato']['Crivella']))
            break;
          case "draw":
            myWordCloud.update(visConfig.frequentWords.filter((word) => word['candidato']['Crivella'] === word['candidato']['Freixo']))
            break;
          default:
            myWordCloud.update(visConfig.frequentWords)
        }
      });

    function wordCloud() {

      let svg = d3.select('svg#word-cloud')
                  .append("g")
                  .attr('class', 'vis')
                  .attr("transform", 'translate('+visConfig.width/2+','+visConfig.height/2+')')


      function draw(words) {

        let cloud = svg.selectAll('text.word')
                       .data(words, (d) => d.word)

        let wordSize = wordSizeScale(words)

        cloud.exit()
             .transition()
             .duration(visConfig.wcExitTransitionDuration)
             .attr('opacity', 0)
             .attr('font-size', 1)
             .remove()

        cloud.enter()
             .append('text')
             .attr('class', 'word')
             .attr('fill', 'black')
             .attr('text-anchor', 'middle')
             .attr('font-size', 1)
             .attr('font-weight', 'bold')
             .text((d) => d.word)
        
        cloud.transition()
             .duration(visConfig.wcEnterTransitionDuration)
             .attr('font-size', d => wordSize(d.count) + 'px')
             .attr('transform', d => 'translate('+d.x+','+d.y+') rotate('+d.rotate+')')
             .attr('fill', d => {
               if (d['candidato']['Freixo'] > d['candidato']['Crivella']) {
                 return visConfig.FreixoColor
               }
               else if (d['candidato']['Freixo'] < d['candidato']['Crivella']) {
                 return visConfig.CrivellaColor
               }

               return visConfig.wcDrawColor
             })
      }
        
      return {
        update: function(words) {
          let wordSize = wordSizeScale(words)

          d3.layout.cloud()
            .size([visConfig.width, visConfig.height])
            .words(words)
            .padding(5)
            .rotate(() => {
              let multiplier = Math.round(Math.random()) === 1 ? 1 : -1

              return multiplier * (Math.floor(Math.random() * 16))
            })
            .font('monospace')
            .fontSize(d => wordSize(d.count))
            .text((d) => d.word)
            .on("end", draw)
            .start()
        }
      }
    }
  }
}


module.exports = drawWordCloud