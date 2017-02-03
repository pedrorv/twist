const React = require('react')
const { Link } = require('react-router')

const Nav = (props) => {
    return (
        <div className="flexbox navigation">
            <Link class="vis" to={'/twist/word-cloud'}>Word Cloud</Link>
        </div>
    )
}

module.exports = Nav