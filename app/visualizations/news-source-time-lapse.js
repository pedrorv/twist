// Based on http://bl.ocks.org/mmattozzi/7018021

const d3 = require('d3')
const moment = require('moment')

const { environmentUrl, convertSourceName } = require('../utilities')

function drawNewsSourceTimeLapse () {

  if (visConfig.newsSources === undefined || visConfig.newsDataHours === undefined) {
    d3.json(environmentUrl('js/news-source.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.newsSources = json

      d3.json(environmentUrl('js/data.json'), function(error2, json2) {
        if (error2) return console.warn(error2)

        visConfig.newsDataHours = json2.map((news) => {
          return {
            ...news,
            data: new moment(news.data).format('DD/MM/YYYY HH:mm:ss')
          }
        })

        showVis()
      })
    })
  } else {
    showVis()
  }

  function showVis() {

    let svg = d3.select('svg#news-time-lapse')
                .append("g")
                .attr('class', 'vis')
                .attr('transform', 'translate('+visConfig.ntsPaddingX+','+visConfig.ntsPaddingY+')')
        

    let newsSources = Object.keys(visConfig.newsSources)
    
    let formatDate = d3.time.format("%d/%m/%Y %H:%M:%S")

    let xScale = d3.time.scale()
                        .range([visConfig.ntsPaddingX, visConfig.nstlVisWidth - 2*visConfig.ntsPaddingX])
                        .domain(d3.extent(visConfig.newsDataHours, (d) => formatDate.parse(d.data)))   
    
    let xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .tickFormat(d3.time.format('%d/%m'))
                      .tickSize(visConfig.nstlTickSize)

    let bubbleChartWidth = (visConfig.nstlVisWidth - 20)
    let bubbleChartHeight = (visConfig.nstlVisHeight - 20)

    let bubbleChart = d3.layout.pack()
                               .sort(null)
                               .size([bubbleChartWidth, bubbleChartHeight])
                               .padding(20)

    let bubbleChartData = {
      children: newsSources.map((source) => {
        return {
          packageName: source,
          className: source,
          value: visConfig.newsSources[source].length
        }
      })
    }

    let sortedNews = visConfig.newsDataHours.sort((a, b) => formatDate.parse(a.data) - formatDate.parse(b.data))

    svg.append('g')
       .attr('class', 'x-axis')
       .attr('transform', 'translate(-10,' + (visConfig.nstlVisHeight - 2*visConfig.ntsPaddingY) + ')')
       .call(xAxis)
       .selectAll('text')
       .attr('y', 15)

    let textSource = d3.select('svg#news-time-lapse')
                       .append('g')
                       .attr('class', 'texts')
                       .append('text')
                       .attr('x', visConfig.nstlVisWidth / 2)
                       .attr('y', 20)
                       .attr('font-size', visConfig.nstlTextSize)
                       .attr('text-anchor', 'middle')
                       .attr('class', 'message')
                       .text('Fonte sobre Candidato em Data')
                       .attr('opacity', 0)

    let textLink = d3.select('g.texts')
                     .append('a')
                     .attr('class', 'link')
                     .attr('xlink:href', 'https://www.google.com.br')
                     .attr('target', '_blank')
                     .on('click', clearNewsAnimation)
                     .append('text')
                     .attr('x', visConfig.nstlVisWidth / 2)
                     .attr('y', 50)
                     .attr('font-size', visConfig.nstlTextSize)
                     .attr('text-anchor', 'middle')
                     .attr('class', 'message')
                     .text('Nome da notícia')
                     .attr('text-decoration', 'underline')
                     .attr('fill', 'blue')
                     .attr('opacity', 0)

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

    let node = d3.select('svg#news-time-lapse')
                  .append('g')
                  .attr('class', 'sources')
                  .selectAll('.node')
                  .data(bubbleChart.nodes(bubbleChartData).filter((d) => !d.children))
                  .enter()
                  .append('g')
                  .attr('class', 'node')
                  .attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')')
                  .append('circle')
                  .attr('class', (d) => d.className)
                  .attr('r', (d) => d.r)
                  .attr('fill', '#eee')
                  .attr('opacity', 0)
                  .on('mouseover', (d) => {
                    highlight.text(convertSourceName(d.className))
                    highlight.style('visibility', 'visible')
                  })
                  .on('mousemove', () => {
                    highlight.style('top', (d3.event.pageY - 10) + 'px').style('left', (d3.event.pageX + 10) + 'px')
                  })
                  .on('mouseout', () => {
                    highlight.style('visibility', 'hidden')
                  })
                  .transition()
                  .duration(200)
                  .delay((d, i) => i * 50)
                  .attr('opacity', 1)

    let currentNews
    
    function returnXPositionCurrentNews(index) {
      return xScale(formatDate.parse(sortedNews[index].data))
    }

    let highlightedNews = svg.select('g.x-axis')
                              .append('circle')
                              .attr('class', 'current-news')
                              .attr('cx', 20)
                              .attr('cy', visConfig.nstlCurrentNewsCy)
                              .attr('r', visConfig.nstlCurrentNewsRadius)
                              .attr('fill', '#000')
                              .attr('opacity', 0)

    

    function animateNews() {
      clearNewsAnimation()

      visConfig.timelapseInterval = setInterval(() => {
        manageAnimationState(1)  
      }, 2500)
    }

    function manageAnimationState(step) {
        if (currentNews === undefined) currentNews = 0
        else currentNews += step
        
        if (currentNews === -1) currentNews = sortedNews.length - 1
        else if (currentNews === sortedNews.length) currentNews = 0

        let data = sortedNews[currentNews]

        let previousIndex

        if (step === 1) {
          previousIndex = (currentNews === 0) ? sortedNews.length - 1 : currentNews - 1
        } else {
          previousIndex = (currentNews === sortedNews.length - 1) ? 0 : currentNews + 1
        }

        let previousData = sortedNews[previousIndex]

        d3.select('circle.current-news').transition()
                                        .duration(200)
                                        .attr('opacity', 1)
                                        .attr('cx', returnXPositionCurrentNews(currentNews))

        textSource.transition()
                  .duration(200)
                  .attr('opacity', 0)

        textLink.transition()
                .duration(200)
                .attr('opacity', 0)

        d3.select('circle.' + previousData.fonte)
          .transition()
          .duration(200)
          .attr('fill', '#eee')

        
        d3.select('a.link').attr('xlink:href', data.url)

        textSource.text(convertSourceName(data.fonte) + ' sobre ' + data.candidato + ' em ' + data.data)
                  .transition()
                  .duration(200)
                  .delay(200)
                  .attr('opacity', 1)

        textLink.text(data['título'])
                .transition()
                .duration(200)
                .delay(200)
                .attr('opacity', 1)

        d3.select('circle.' + data.fonte)
          .transition()
          .duration(200)
          .delay(200)
          .attr('fill', (data.candidato === 'Freixo') ? visConfig.FreixoColor : visConfig.CrivellaColor)

    }

    function clearNewsAnimation() {
      clearInterval(visConfig.timelapseInterval)
    }

    d3.select('p.play').on('click', function() {
      d3.select('div.vis-controls').selectAll('p.button').classed('active', false)
      d3.select(this).classed('active', true)

      animateNews()
    })
    d3.select('p.pause').on('click', function() {
      d3.select('div.vis-controls').selectAll('p.button').classed('active', false)
      d3.select(this).classed('active', true)

      clearNewsAnimation()
    })
    d3.select('p.back').on('click', () => {
      d3.select('div.vis-controls').selectAll('p.button').classed('active', false)
      d3.select('p.pause').classed('active', true)

      clearNewsAnimation()
      manageAnimationState(-1)
    })
    d3.select('p.forward').on('click', () => {
      d3.select('div.vis-controls').selectAll('p.button').classed('active', false)
      d3.select('p.pause').classed('active', true)

      clearNewsAnimation()
      manageAnimationState(1)
    })
  }
}


module.exports = drawNewsSourceTimeLapse