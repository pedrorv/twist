const d3 = require('d3')
const moment = require('moment')
const { environmentUrl } = require('../utilities')

function drawNewsTimeSeries () {

  if (visConfig.newsData === undefined) {
    d3.json(environmentUrl('js/data.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.newsData = json.map((news) => {
        return {
          data: new moment(news.data).format('YYYY-MM-DD'),
          candidato: news.candidato
        }
      })

      showVis()
    })
  } else {
    showVis()
  }


  function showVis() {

    let svg = d3.select('svg#news-time-series')
                  .append("g")
                  .attr('class', 'vis')
                  .attr('transform', 'translate('+visConfig.ntsPaddingX+','+visConfig.ntsPaddingY+')')
    

    let mostNewsInOneDay = visConfig.newsData.reduce((acc, news) => {
      let newObj = acc
    
      if (newObj[news.data+'/'+news.candidato] === undefined) newObj[news.data+'/'+news.candidato] = 0

      newObj[news.data+'/'+news.candidato]++

      return newObj
    }, {})

    let formatDate = d3.time.format("%Y-%m-%d")

    let mostNewsArray = Object.keys(mostNewsInOneDay).map((key) => {
      return {
        date: formatDate.parse(key.split('/')[0]),
        count: mostNewsInOneDay[key],
        candidate: key.split('/')[1]
      }
    }).sort((a, b) => b.count - a.count)

    let freixoData = mostNewsArray.filter((news) => news.candidate === 'Freixo')
                                  .sort((a, b) => b.date - a.date)

    let crivellaData = mostNewsArray.filter((news) => news.candidate === 'Crivella')
                                    .sort((a, b) => b.date - a.date)
    

    let xScale = d3.time.scale()
                        .range([visConfig.ntsPaddingX, visConfig.width - 2*visConfig.ntsPaddingX])
                        .domain(d3.extent(visConfig.newsData, (d) => formatDate.parse(d.data)))               


    let yScale = d3.scale.linear()
                         .range([visConfig.ntsPaddingY, visConfig.height - visConfig.ntsPaddingY])
                         .domain([mostNewsArray[0].count, 0])


    let line = d3.svg.line()
                     .x(d => xScale(d.date))
                     .y(d => yScale(d.count))

    let xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .tickFormat(d3.time.format('%d/%m'))
                      .tickSize(visConfig.ntsTickSize)


    let yAxis = d3.svg.axis()
                      .scale(yScale)
                      .orient('left')
                      .tickSize(visConfig.ntsTickSize)

    svg.append('g')
       .attr('class', 'x-axis')
       .attr('transform', 'translate(0,' + (visConfig.height - 2*visConfig.ntsPaddingY) + ')')
       .call(xAxis)

    svg.append('g')
       .attr('class', 'y-axis')
       .attr('transform', 'translate(' + visConfig.ntsPaddingX + ',' + (-visConfig.ntsPaddingY+visConfig.ntsTickSize) + ')')
       .call(yAxis)


    ;['crivella', 'freixo'].forEach((candidate, index) => {
      
      svg.selectAll('circle.' + candidate)
       .data((candidate === 'freixo') ? freixoData : crivellaData)
       .enter()
       .append('circle')
       .attr('class', candidate)
       .attr('transform', 'translate(0,' + (-visConfig.ntsPaddingY+visConfig.ntsTickSize) + ')')
       .attr('cx', (d) => xScale(d.date))
       .attr('cy', (d) => yScale(d.count))
       .attr('r', 5)
       .attr('fill', (candidate === 'freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)
       .attr('stroke', 0)
       .attr('opacity', 0)
       .transition()
       .duration(300)
       .delay(index * 300)
       .attr('opacity', 1)

      svg.append('path')
       .attr('class', candidate)
       .attr('transform', 'translate(0,' + (-visConfig.ntsPaddingY+visConfig.ntsTickSize) + ')')
       .attr('d', line((candidate === 'freixo') ? freixoData : crivellaData))
       .attr('fill', 'transparent')
       .attr('stroke', (candidate === 'freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)
       .attr('stroke-width', visConfig.ntsPathSize)
       .attr('opacity', 0)
       .transition()
       .duration(300)
       .delay(index * 300)
       .attr('opacity', 1)

    })

    d3.selectAll('p.checkbutton').on('click', function() {
      let button = d3.select(this)

      button.classed('active', !button.classed('active'))
      d3.selectAll('.' + button.attr('value')).transition().duration(300).attr('opacity', button.classed('active') ? 1 : 0)
    })
  }
}


module.exports = drawNewsTimeSeries