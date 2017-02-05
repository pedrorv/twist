const React = require('react')
const { Link } = require('react-router')

const Nav = (props) => {
    return (
        <div className="flexbox navigation">
            <div className="flexbox logo">
                <h1>Eleições 2016</h1>
            </div>

            <div className="flexbox links">
                <Link activeClassName="active" className="vis" to={'/twist/analises-temporais'}>Análises Temporais</Link>
                <Link activeClassName="active" className="vis" to={'/twist/analises-frequencia'}>Análises de Frequência</Link>
            </div>
        </div>
    )
}

module.exports = Nav