const d3 = require('d3')

const { environmentUrl } = require('../utilities')

function drawNewsDonut () {

  if (visConfig.newsSources === undefined) {
    d3.json(environmentUrl('js/news-source.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.newsSources = json

      showVis()
    })
  } else {
    showVis()
  }

  function returnCadidatesData(arr) {
    let countObj = arr.reduce((acc, news) => {
                          let newObj = acc

                          if (newObj[news.candidato] === undefined) newObj[news.candidato] = 0

                          newObj[news.candidato]++

                          return newObj
                        }, {})

    let keysArr = Object.keys(countObj)

    return keysArr.map((key) => {
      return {
        candidato: key,
        count: countObj[key]
      }
    })
  }

  function showVis() {

    let svg = d3.select('svg#news-donut')
                  .append("g")
                  .attr('class', 'vis')
                  .attr('transform', 'translate('+visConfig.width/2+','+visConfig.height/2+')')
    
    let arc = d3.svg.arc()
                    .outerRadius(visConfig.nspcChartRadius)
                    .innerRadius(visConfig.nspcChartRadius/1.6)

    let pie = d3.layout.pie()
                       .value(d => d.count)

    

    let allNewsSources = Object.keys(visConfig.newsSources)
                               .reduce((acc, key) => acc.concat(visConfig.newsSources[key]), [])
    
    let allNewsSourcesCandidatesData = returnCadidatesData(allNewsSources)


    let arcGroup = svg.selectAll('.arc')
                      .data(pie(allNewsSourcesCandidatesData))
                      .enter()
                      .append('g')
                      .attr('class', 'arc')
                      .append('path')
                      .attr('d', arc)
                      .style('fill', (d) => (d.data.candidato === 'Freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)
                      
      
    let centerTextTop = svg.append('text')
                           .attr('class', 'total-news')
                           .attr('text-anchor', 'middle')
                           .attr('font-size', 18)
                           .attr('font-family', 'monospace')
                           .attr('transform', 'translate(0, -10)')
                           .text(() => {
                             return allNewsSources.length + ((allNewsSources.length > 1) ? ' notícias' : ' notícia')
                           })

    let centerTextBottom = svg.append('text')
                              .attr('class', 'total-sources')
                              .attr('text-anchor', 'middle')
                              .attr('font-size', 18)
                              .attr('font-family', 'monospace')
                              .attr('transform', 'translate(0, 10)')
                              .text(() => {
                                return Object.keys(visConfig.newsSources).length + ((Object.keys(visConfig.newsSources).length > 1) ? ' fontes' : ' fonte')
                              })
  }
}


module.exports = drawNewsDonut