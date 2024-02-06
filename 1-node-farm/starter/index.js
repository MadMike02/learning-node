const fs = require('fs');

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
fs.readFile("./txt/start.txt", "utf-8", (err1, data1) => {
    if (err1) return console.log("ERROR!:", err1)

    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err2, data2) => {
        fs.readFile(`./txt/append.txt`, "utf-8", (err2, data3) => {
            fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", err => {
                console.log("file is written")
            })
        })
    })
})
console.log("reading file")