const React = require('react')

const NewsTimeSeries = require('NewsTimeSeries')
const NewsSourceTimeLapse = require('NewsSourceTimeLapse')

const TemporalAnalysis = (props) => {
    return (
        <div className="flexbox visualizations-wrapper">
            <NewsTimeSeries />
            <NewsSourceTimeLapse />
        </div>
    )
}

module.exports = TemporalAnalysis