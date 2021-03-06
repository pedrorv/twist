const React = require('react')

const Nav = require('Nav')

const Main = (props) => {
    return (
        <div className="flexbox main-component">
            <Nav />
            {props.children}
        </div>
    )
}

module.exports = Main