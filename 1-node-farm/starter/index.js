const fs = require('fs');

//synchronous file reading
const textIn = fs.readFileSync("./txt/input.txt", 'utf-8');
console.log(textIn)

const textOut = `THis is my custom text: ${textIn}.\n Created on ${Date.now()}`
fs.writeFileSync("./txt/output.txt", textOut)
console.log("file written!")