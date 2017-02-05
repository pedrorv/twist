const React = require('react')
const Router = require('react-router')
const { Link } = require('react-router')


const Home = React.createClass({
    componentDidMount: function() {
        Router.browserHistory.push('/twist/analises-temporais')
    },
    render: function() {
        return (
            <div className="flexbox">
            
            </div>
        )
    }
})
module.exports = Home