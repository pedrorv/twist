const React = require('react')
const { Link } = require('react-router')

const Home = (props) => {
    return (
        <div>
            <Link to={'/twist/serie-temporal'}>Série temporal</Link>
            <Link to={'/twist/palavras-frequentes'}>Word Cloud</Link>
        </div>
    )
}

module.exports = Home