const fs = require('fs') 

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase()
}

let rawData = 
  fs.readFileSync('rawData.json', { encoding: 'utf8' })

let jsonData = JSON.parse(rawData)

let authorsToArray = 
  jsonData.map((news) => {
    let newsObj = { 
      "autores": news["autores"]
                  .split(/[,-/]|\s+e\s+/)
                  .map((autor) => autor.trim())
                  .map((autor) => {
                    if (autor.length === 0) return ""

                    return autor.split(' ')
                                .map((name) => capitalize(name) || "")
                                .join(' ')
                  })
                  .filter((autor) => autor.length > 0)
                  .filter((autor) => autor.toLowerCase() !== 'o globo')
                  .filter((autor) => autor.toLowerCase() !== 'extra'),
      "candidato": news["candidato"],
      "data": news["data"],
      "fonte": news["fonte"],
      "título": news["título"],
      "url": news["url"]
    }

    return newsObj
  })



fs.writeFileSync('data.json', JSON.stringify(authorsToArray, null, 2))