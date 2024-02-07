const fs = require('fs')
const server = require('http').createServer();

server.on('request', (req, res) => {
    //solution 1
    // loading whole huge file
    // fs.readFile('test-file.txt', (err, data) => {
    //     if (err) console.log(err)
    //     res.end(data);
    // })

    //solution 2 : will cause back pressure
    // const readable = fs.createReadStream('test-file2.txt')
    // readable.on('data', chunk => {
    //     //writing data in response stream
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end("INTERNAL SERVER ERROR")
    // })

    //soltuin 3
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    // readblesouce . pipe(writable Destination)

})

server.listen(8000, '127.0.0.1', () => {
    console.log('listening.....')
})