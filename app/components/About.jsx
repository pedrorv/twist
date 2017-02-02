const React = require('react')
const { Link } = require('react-router')

const About = (props) => {
    return (
        <div>
            <p>About Component</p>
            <Link to={'/twist'}>Home</Link>
        </div>
    )
}

module.exports = About