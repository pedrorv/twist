const React = require('react')
const { Link } = require('react-router')

const Home = (props) => {
    return (
        <div>
            <p>Home Component</p>
            <Link to={'/twist/word-cloud'}>word cloud</Link>
        </div>
    )
}

module.exports = Home