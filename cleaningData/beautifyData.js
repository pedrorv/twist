const fs = require('fs') 
const capitalize = require('./capitalize')

let rawData = JSON.parse(fs.readFileSync('rawData.json', { encoding: 'utf8' }))

let authorsToArray = 
  rawData.map((news) => {
    let newsObj = { 
      "autores": news["autores"]
                  .split(/[,-/]|\s+e\s+/)
                  .map((autor) => autor.trim())
                  .map((autor) => {
                    if (autor.length === 0) return ""

                    return autor.split(' ')
                                .map((name) => capitalize(name))
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
  .filter((news) => news["título"] !== "")

let frequentWords = 
  authorsToArray
    .map((news) => {
      return {
        "título": news['título'],
        "candidato": news["candidato"]
      }
    })
    .reduce((acc, news) => {
      let newObj = acc
      let lowerCaseWords = 
        news["título"].split(/[0-9%–°)º|ª‘;”,’\-.:('"\!/\s+]/)
             .map((word) => word.toLowerCase())
             .forEach((word) => {
               if (newObj[word] === undefined) newObj[word] = { count: 0, candidato: { "Freixo": 0, "Crivella": 0 }}
               newObj[word].count++
               newObj[word].candidato[news["candidato"]]++
             })
      return newObj
    }, {})

let filter = JSON.parse(fs.readFileSync('stopWordsFilter.json', { encoding: 'utf8' }))

let frequentWordsArr =
  Object.keys(frequentWords)
    .map((key) => {
      return {
        word: key, 
        count: frequentWords[key].count,
        candidato: {
          'Freixo': frequentWords[key].candidato['Freixo'],
          'Crivella': frequentWords[key].candidato['Crivella']
        }
      }
    })
    .filter((word) => !filter[word.word] && word.word !== "")
    .sort((a, b) => b.count - a.count)

fs.writeFileSync('data.json', JSON.stringify(authorsToArray, null, 2))
fs.writeFileSync('frequentWords.json', JSON.stringify(frequentWordsArr, null, 2))



// Stopwords filter


// https://gist.github.com/alopes/5358189 stopwords list


// let filter = 
//   fs.readFileSync('stopwords.txt', { encoding: 'utf8' })
//     .split('\n')
//     .reduce((acc, word) => {
//       let obj = acc
//       obj[word.trim()] = true

//       return obj
//     }, {})

// fs.writeFileSync('stopWordsFilter.json', JSON.stringify(filter, null, 2))



// https://virtuati.com.br/cliente/knowledgebase/25/Lista-de-StopWords.html stopwords list


// let filter = JSON.parse(fs.readFileSync('stopWordsFilter.json', { encoding: 'utf8' }))

// let stopwords = 'a, agora, ainda, alguém, algum, alguma, algumas, alguns, ampla, amplas, amplo, amplos, ante, antes, ao, aos, após, aquela, aquelas, aquele, aqueles, aquilo, as, até, através, cada, coisa, coisas, com, como, contra, contudo, da, daquele, daqueles, das, de, dela, delas, dele, deles, depois, dessa, dessas, desse, desses, desta, destas, deste, deste, destes, deve, devem, devendo, dever, deverá, deverão, deveria, deveriam, devia, deviam, disse, disso, disto, dito, diz, dizem, do, dos, e, é, ela, elas, ele, eles, em, enquanto, entre, era, essa, essas, esse, esses, esta, está, estamos, estão, estas, estava, estavam, estávamos, este, estes, estou, eu, fazendo, fazer, feita, feitas, feito, feitos, foi, for, foram, fosse, fossem, grande, grandes, há, isso, isto, já, la, lá, lhe, lhes, lo, mas, me, mesma, mesmas, mesmo, mesmos, meu, meus, minha, minhas, muita, muitas, muito, muitos, na, não, nas, nem, nenhum, nessa, nessas, nesta, nestas, ninguém, no, nos, nós, nossa, nossas, nosso, nossos, num, numa, nunca, o, os, ou, outra, outras, outro, outros, para, pela, pelas, pelo, pelos, pequena, pequenas, pequeno, pequenos, per, perante, pode, pude, podendo, poder, poderia, poderiam, podia, podiam, pois, por, porém, porque, posso, pouca, poucas, pouco, poucos, primeiro, primeiros, própria, próprias, próprio, próprios, quais, qual, quando, quanto, quantos, que, quem, são, se, seja, sejam, sem, sempre, sendo, será, serão, seu, seus, si, sido, só, sob, sobre, sua, suas, talvez, também, tampouco, te, tem, tendo, tenha, ter, teu, teus, ti, tido, tinha, tinham, toda, todas, todavia, todo, todos, tu, tua, tuas, tudo, última, últimas, último, últimos, um, uma, umas, uns, vendo, ver, vez, vindo, vir, vos, vós'.split(', ')

// stopwords.forEach((word) => {
//   if (filter[word] === undefined) {
//     filter[word] = true
//   }
// })

// fs.writeFileSync('stopWordsFilter.json', JSON.stringify(filter, null, 2))