function environmentUrl(url) {
  if (window.location.hostname.indexOf('github') !== -1) {
    return 'public/' + url
  }

  return '../' + url
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

function convertSourceName(string) {
  switch(string) {
    case 'globo_g1':
      return 'Globo G1';
    case 'extra':
    case 'folha':
    case 'exame':
    case 'r7':
    case 'bing':
      return capitalize(string);
    case 'dci':
    case 'jb':
    case 'uol':
    case 'em':
      return string.toUpperCase();
    case 'epoca':
      return 'Época';
    case 'senado_federal':
      return 'Senado Federal';
    case 'planalto_presidencia':
      return 'Planalto Presidência';
    case 'gesporte':
      return 'Globo Esporte';
    case 'zerohora':
      return 'Zero Hora';
    case 'elpais':
      return 'El País';
    case 'otempo':
      return 'O Tempo';
    case 'odia':
      return 'O Dia';
    case 'hora_sc':
      return 'Hora SC';
    default:
      return string;    
  }
}

module.exports = {
  environmentUrl,
  capitalize,
  convertSourceName
}