const React = require('react')
const { Link } = require('react-router')

const Nav = (props) => {
    return (
        <div className="flexbox navigation">
            <Link class="vis" to={'/twist/palavras-frequentes'}>Word Cloud</Link>
        </div>
    )
}

module.exports = Nav