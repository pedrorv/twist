const React = require('react')

const WordCloud = require('WordCloud')
const NewsSourceDonut = require('NewsSourceDonut')

const FrequencyAnalysis = (props) => {
    return (
        <div className="flexbox visualizations-wrapper">
            <WordCloud />
            <NewsSourceDonut />
        </div>
    )
}

module.exports = FrequencyAnalysis