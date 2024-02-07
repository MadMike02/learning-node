const fs = require('fs')
const crypto = require('crypto')

const start = Date.now()
//changing pool size
process.env.UV_THREADPOOL_SIZE = 4;


fs.readFile('test-file.txt', () => {
    console.log("I/O file read finished")

    //after pooling node js waits and the queue is empty so immediate will be executed first
    
    //will wait and run after immediate
    setTimeout(() => {
        console.log("time finished")
    }, 0)
    
    //will wait 3 seconds
    setTimeout(() => {
        console.log("timer 3")
    }, 3000);

    //run after as soon as no waiting
    setImmediate(() => {
        console.log("imediate finished")
    });


    //run after as soon as stage completes
    process.nextTick( () => {
        console.log('process.nextTick')
    })

    //thread pooling

    //these all processes will take same amount of time due to thread pooling
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () => {
        console.log(Date.now() - start, "password encrypted")
    })

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () => {
        console.log(Date.now() - start, "password encrypted")
    })

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () => {
        console.log(Date.now() - start, "password encrypted")
    })

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512" , () => {
        console.log(Date.now() - start, "password encrypted")
    })

})

//print first
console.log("hello from top-level -code")

