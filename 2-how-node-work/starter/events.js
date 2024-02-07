const EventEmitter = require('events')
const http = require('http');

const myEmitter = new EventEmitter();

class Sales extends EventEmitter
{
    constructor(){
        super();
    }
}

const myClassEmiiter = new Sales()

myEmitter.on('newSale', () => {
    console.log("There is a new sale")
})

myEmitter.on('newSale', () => {
    console.log("There is a new sale from listerner 2")
})

myEmitter.on('newSale', (stock) => {
    console.log("There is a new sale from listerner 3", stock)
})
myClassEmiiter.on('fromClass', (stock) => {
    console.log("There is a new sale from listerner 4", )
})

myEmitter.emit('newSale', 9);
myClassEmiiter.emit('fromClass');

const server = http.createServer();
server.on('request', (req, res) => {
    console.log('request received')
    res.end('Response send')
})
server.on('request', (req, res) => {
    console.log('another request received')
})
server.on('close', () => {
    console.log('server closes')
})
server.on('error', (err) => {
    console.log("received error", err);
})
server.listen(8000, "127.0.0.1", () => {
    console.log('waiting for requests---');
})