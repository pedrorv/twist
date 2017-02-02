const React = require('react')
const { Link } = require('react-router')

const Home = (props) => {
    return (
        <div>
            <p>Home Component</p>
            <Link to={'/twist/about'}>About</Link>
        </div>
    )
}

module.exports = Home