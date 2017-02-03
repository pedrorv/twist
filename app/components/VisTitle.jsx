const React = require('react')
const { Link } = require('react-router')

const VisTitle = (props) => {
    return (
        <div className="flexbox vis-title">
            <h2>{props.title}</h2>
        </div>
    )
}

module.exports = VisTitle