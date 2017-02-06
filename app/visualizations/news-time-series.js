const d3 = require('d3')
const moment = require('moment')
const { environmentUrl } = require('../utilities')

function drawNewsTimeSeries () {

  if (visConfig.newsData === undefined) {
    d3.json(environmentUrl('js/data.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.newsData = json.map((news) => {
        return {
          data: new moment(news.data).format('DD/MM/YYYY'),
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
    
      if (newObj[news.data+'-'+news.candidato] === undefined) newObj[news.data+'-'+news.candidato] = 0

      newObj[news.data+'-'+news.candidato]++

      return newObj
    }, {})

    let formatDate = d3.time.format("%d/%m/%Y")

    let mostNewsArray = Object.keys(mostNewsInOneDay).map((key) => {
      return {
        date: formatDate.parse(key.split('-')[0]),
        count: mostNewsInOneDay[key],
        candidate: key.split('-')[1],
        unformatedDate: key.split('-')[0]
      }
    }).sort((a, b) => b.count - a.count)

    let freixoData = mostNewsArray.filter((news) => news.candidate === 'Freixo')
                                  .sort((a, b) => b.date - a.date)

    let crivellaData = mostNewsArray.filter((news) => news.candidate === 'Crivella')
                                    .sort((a, b) => b.date - a.date)
    

    let xScale = d3.time.scale()
                        .range([visConfig.ntsPaddingX, visConfig.ntsVisWidth - 2*visConfig.ntsPaddingX])
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



    ;['crivella', 'freixo'].forEach((candidate, index) => {

      let data = (candidate === 'freixo') ? freixoData : crivellaData
      let color = (candidate === 'freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor
      
      svg.append('path')
       .attr('class', candidate)
       .attr('transform', 'translate(0,' + (-visConfig.ntsPaddingY+visConfig.ntsTickSize) + ')')
       .attr('d', line(data))
       .attr('fill', 'transparent')
       .attr('stroke', color)
       .attr('stroke-width', 2)
       .attr('opacity', 0)
       .transition()
       .duration(300)
       .delay(300)
       .attr('opacity', 1)

      svg.selectAll('circle.' + candidate)
       .data(data)
       .enter()
       .append('circle')
       .attr('class', candidate)
       .attr('transform', 'translate(0,' + (-visConfig.ntsPaddingY+visConfig.ntsTickSize) + ')')
       .attr('cx', (d) => xScale(d.date))
       .attr('cy', (d) => yScale(d.count))
       .attr('r', 3)
       .attr('fill', '#fff')
       .attr('stroke', color)
       .attr('stroke-width', 2)
       .attr('opacity', 0)
       .on('mouseover', (d) => {
         highlight.text(d.count + ((d.count > 1) ? ' notícias' : ' notícia') + ' em ' + d.unformatedDate)
         highlight.style('visibility', 'visible')
       })
       .on('mousemove', () => {
         highlight.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px')
       })
       .on('mouseout', () => {
         highlight.style('visibility', 'hidden')
       })
       .transition()
       .duration(300)
       .attr('opacity', 1)

    })

    d3.selectAll('p.checkbutton').on('click', function() {
      let button = d3.select(this)

      button.classed('active', !button.classed('active'))
      d3.selectAll('circle.' + button.attr('value')).transition().duration(300).style('visibility', button.classed('active') ? 'visible' : 'hidden')
      d3.selectAll('path.' + button.attr('value')).transition().duration(300).style('visibility', button.classed('active') ? 'visible' : 'hidden')
    })
  }
}


module.exports = drawNewsTimeSeries