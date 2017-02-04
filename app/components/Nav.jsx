const React = require('react')
const { Link } = require('react-router')

const Nav = (props) => {
    return (
        <div className="flexbox navigation">
            <Link className="vis" to={'/twist/serie-temporal'}>Notícias sobre candidatos</Link>
            <Link className="vis" to={'/twist/palavras-frequentes'}>Palavras Frequentes</Link>
            <Link className="vis" to={'/twist/fontes-donut'}>Notícias por Fonte</Link>
            <Link className="vis" to={'/twist/fontes-time-lapse'}>Time lapse notícias</Link>
        </div>
    )
}

module.exports = Nav