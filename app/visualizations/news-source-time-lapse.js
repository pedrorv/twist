// Based on http://bl.ocks.org/mmattozzi/7018021

const d3 = require('d3')

const { environmentUrl } = require('../utilities')

function drawNewsSourceTimeLapse () {

  if (visConfig.newsSources === undefined || visConfig.unformatedData === undefined) {
    d3.json(environmentUrl('js/news-source.json'), function(error, json) {
      if (error) return console.warn(error)
      
      visConfig.newsSources = json

      d3.json(environmentUrl('js/data.json'), function(error2, json2) {
        if (error2) return console.warn(error2)

        visConfig.unformatedData = json2

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
    
    let formatDate = d3.time.format("%Y-%m-%dT%H:%M:%SZ")

    let xScale = d3.time.scale()
                        .range([visConfig.ntsPaddingX, visConfig.width - 2*visConfig.ntsPaddingX])
                        .domain(d3.extent(visConfig.unformatedData, (d) => formatDate.parse(d.data)))   
    
    let xAxis = d3.svg.axis()
                      .scale(xScale)
                      .orient('bottom')
                      .tickFormat(d3.time.format('%d/%m'))
                      .tickSize(visConfig.ntsTickSize)

    let bubbleChartWidth = (visConfig.width - 20)
    let bubbleChartHeight = (visConfig.height - 20)

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

    svg.append('g')
       .attr('class', 'x-axis')
       .attr('transform', 'translate(-10,' + (visConfig.height - 2*visConfig.ntsPaddingY) + ')')
       .call(xAxis)

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
                  .attr('r', (d) => d.r)
                  .attr('fill', '#fff')
                  .attr('stroke', '#000')
                  .attr('stroke-width', 1)
                  .attr('fonte', (d) => d.className)
  }
}


module.exports = drawNewsSourceTimeLapse