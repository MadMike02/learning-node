// const fs = require('fs');
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

//callback executed each time when a request is comes
const server = http.createServer((req, res) => {
    //sending request

    const pathName = req.url
    if (pathName === '/' || pathName === '/overview') {
        res.end("this is overview!")
    } else if (pathName === '/product') {
        res.end("this is product");
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html'
        });
        res.end("<h2>Page not found !</h2>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("server is started")
})