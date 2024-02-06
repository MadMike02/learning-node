const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

/////////////////////////////////////////////////////
//FILES

// BLOCKING SYNCHRONOUS

// //synchronous file reading
// const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
// console.log(textIn)

// //synchronous
// const textOut = `THis is my custom text: ${textIn}.\n Created on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", textOut)
// console.log("file written!")

//Non BLocking asynchronous
// callback hell
// fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
//     if (err1) return console.log("ERROR!:", err1)

//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
//         fs.readFile(`./txt/append.txt`, "utf-8", (err2, data3) => {
//             fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
//                 console.log("file is written")
//             })
//         })
//     })
// })
// console.log("reading file")

////////////////////////////////////////////////////////
//SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    
    if (!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data)
//callback executed each time when a request is comes
const server = http.createServer((req, res) => {
    //sending request
    const pathName = req.url
    
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });

        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
        res.end(output)
    } else if (pathName === '/product') {
        res.end("this is product");
    } else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(data);
    } 
    else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h2>Page not found !</h2>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("server is started")
})