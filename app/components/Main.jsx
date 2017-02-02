const React = require('react')

const Main = (props) => {
    return (
        <div className="flexbox main-component">
            {props.children}
        </div>
    )
}

module.exports = Main