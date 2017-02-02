function environmentUrl(url) {
  if (window.location.hostname.indexOf('github') !== -1) {
    return 'public/' + url
  }

  return '../' + url
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

module.exports = {
  environmentUrl,
  capitalize
}