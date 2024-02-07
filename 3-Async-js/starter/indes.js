const fs = require('fs')
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`breed${data}`)

    //begin as pending promise
    //return result promise(fulfilled) or reject promise(Failed)
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then(res => {
            console.log(res.body.message);
            
            fs.writeFile('dog-img.txt', res.body.message, err => {
                if (err) return console.log(err.message)
                
                console.log('random dog imagefile saved')
            })
        }).catch(err => {
            console.log(err.message)
        })
})