const d3 = require('d3')

const { environmentUrl, convertSourceName } = require('../utilities')

function drawNewsSourceDonut () {

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
                  .attr('transform', 'translate('+visConfig.nsdcVisWidth/2+','+visConfig.nsdcVisHeight/2+')')
    
    let arc = d3.svg.arc()
                    .outerRadius(visConfig.nsdcChartRadius)
                    .innerRadius(visConfig.nsdcChartRadius/1.6)

    let pie = d3.layout.pie()
                       .value(d => d.count)

    

    let newsSources = Object.keys(visConfig.newsSources)

    let allNewsSources = newsSources.reduce((acc, key) => acc.concat(visConfig.newsSources[key]), [])
    
    let allNewsSourcesCandidatesData = returnCadidatesData(allNewsSources)

    let highlight = d3.select('body')
                      .append('div')
                      .style('position', 'absolute')
                      .style('z-index', 30)
                      .style('visibility', 'hidden')
                      .style('color', 'white')
                      .style('padding', '10px')
                      .style('background-color', 'rgba(0,0,0,0.8)')
                      .style('border-radius', '5px')
                      .style('font', '12px monospace')
                      .text('test')

    let arcGroup = svg.selectAll('.arc')
                      .data(pie(allNewsSourcesCandidatesData))
                      .enter()
                      .append('g')
                      .attr('class', 'arc')
                      .append('path')
                      .attr('d', arc)
                      .style('fill', (d) => (d.data.candidato === 'Freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)
                      .attr('opacity', 0)
                      .on('mouseover', (d) => {
                        highlight.text(d.data.candidato + ': ' + d.data.count)
                        highlight.style('visibility', 'visible')
                      })
                      .on('mousemove', () => {
                        highlight.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px')
                      })
                      .on('mouseout', () => {
                        highlight.style('visibility', 'hidden')
                      })
                      .transition()
                      .duration(visConfig.nsdcChartTransition)
                      .attr('opacity', 1)
                      
      
    let centerTextTop = svg.append('text')
                           .attr('class', 'total-news')
                           .attr('text-anchor', 'middle')
                           .attr('font-size', 18)
                           .attr('font-family', 'monospace')
                           .attr('transform', 'translate(0, -10)')
                           .text(() => {
                             return allNewsSources.length + ((allNewsSources.length > 1) ? ' notícias' : ' notícia')
                           })
                           .attr('opacity', 0)
                           .transition()
                           .duration(visConfig.nsdcChartTransition)
                           .delay(visConfig.nsdcChartDelay)
                           .attr('opacity', 1)

    let centerTextBottom = svg.append('text')
                              .attr('class', 'total-sources')
                              .attr('text-anchor', 'middle')
                              .attr('font-size', 18)
                              .attr('font-family', 'monospace')
                              .attr('transform', 'translate(0, 10)')
                              .text(() => {
                                return newsSources.length + ((newsSources.length > 1) ? ' fontes' : ' fonte')
                              })
                              .attr('opacity', 0)
                              .transition()
                              .duration(visConfig.nsdcChartTransition)
                              .delay(visConfig.nsdcChartDelay)
                              .attr('opacity', 1)


    function updateGraph(filter) {
      let currentArcs = d3.selectAll('.arc').remove()

      let arcGroup = svg.selectAll('.arc')
                      .data(pie((filter !== 'all') ? returnCadidatesData(visConfig.newsSources[filter]) : allNewsSourcesCandidatesData))
                      .enter()
                      .append('g')
                      .attr('class', 'arc')
                      .append('path')
                      .attr('d', arc)
                      .style('fill', (d) => (d.data.candidato === 'Freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)
                      .attr('opacity', 0)
                      .on('mouseover', (d) => {
                        highlight.text(d.data.candidato + ': ' + d.data.count)
                        highlight.style('visibility', 'visible')
                      })
                      .on('mousemove', () => {
                        highlight.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px')
                      })
                      .on('mouseout', () => {
                        highlight.style('visibility', 'hidden')
                      })
                      .transition()
                      .duration(visConfig.nsdcChartTransition)
                      .attr('opacity', 1)

      d3.select('text.total-news').text(() => {
        if (filter === 'all') return allNewsSources.length + ((allNewsSources.length > 1) ? ' notícias' : ' notícia')

        return visConfig.newsSources[filter].length + ((visConfig.newsSources[filter].length > 1) ? ' notícias' : ' notícia')
      })
      .attr('opacity', 0)
      .transition()
      .duration(visConfig.nsdcChartTransition)
      .delay(visConfig.nsdcChartDelay)
      .attr('opacity', 1)

      d3.select('text.total-sources').text(() => {
        if (filter === 'all') return newsSources.length + ((newsSources.length > 1) ? ' fontes' : ' fonte')

        return convertSourceName(filter)
      })
      .attr('opacity', 0)
      .transition()
      .duration(visConfig.nsdcChartTransition)
      .delay(visConfig.nsdcChartDelay)
      .attr('opacity', 1)
    }

    // Add options to selector
    console.log(newsSources)

    newsSources.forEach((source) => {
      d3.select('#news-source-selection')
        .append('option')
        .attr('value', source)
        .text(convertSourceName(source))
        
      d3.select('#news-source-selection')
        .on('change', function() {
          let selector = d3.select(this)[0][0]
          updateGraph(selector.options[selector.selectedIndex].value)
        })
    })
  }
}


module.exports = drawNewsSourceDonut