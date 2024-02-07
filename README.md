https://nodejs.org/docs/latest/api/

# NodeJS
- Javascript runtime build on open source v8 javascript engine.
- It is single threaded, event driven , non-blocking I/o language.
- In terminal - `node` then press tab to see available global packages.
- to use output of last operation use `_`, i.e. `1+2` will give 3 then `_+3` will give 6.

## Synchronous
- Code executes line by line.
- BLocking operation as if there will be error then the operation will be stop.

## Asynchronous
- Use of callbacks for getting the data and the execution of next line starts while the callback will be called when data will be available.
- Non-blocking operation

AS NodeJs is single threaded i.e. the all calculations and stuffs are happening on same thread on CPU. All the users using the app is connected to that one thread only. SO, if there is a blocking operation happens by any one user then other users cannot use the app as the thread is blocked.

In Asunchronous operation the heavy operations will be done in the backend and by this the other users operation will not gets blocked. That's why node has so many callbacks.

`Callback Hell` --- nested multiple callbacks
For preventing callback hell use `Promises` or `Async/Await`

Arror functions will have the `this` from the parent while normal functions will have their own this keyword

- versioning --- major/minor/patch 
    - patch - bug fixes,
    - minor - new features
    - major - main changes that affects previous versions
    - ~ - accepts fixes version when run npn update package
    - ^ - accept minor fixes version when updated
    - '*' - accepts all version when updated

## HOW NODE JS WORKS
- It is made up by many dependencies
- main one are `v8 chrome js engine` and `libuv` library
- `libuv` library provides the event loop, thread pool, asynchronout functioning to the node js

## EVENT LOOP ORDER
- It is basically for the execution of callbacks comming from methods that are stored in the callback queue.
- Each event can have multiple callback queues.
- The order for the working of node single thread sequences of instructions are as follows:
    - Initailize program
    - Execute "top-level" code
    - Require modules
    - Register event callbacks
    - Start event loop
- Event loop order are as follow:
    - Expired timer callbacks
    - I/O pooling and callbacks
    - setImediate callbacks
    - Close callbacks

        - Process.nextTick() callback
        - Other microtask callback (promises)
         these two will be executed after an phase of above 4 stages as soon as the stage completes.

## EVEN_DRIVEN ARCHITECTURE
Event emitter ===> emits events ===>> event listerners ===>>calls ====>>Attached callback function

## STREAMS
- Used to process (read and write) data piece by piece (chunks), without completing the whole read or write operation, and therefore without keeping all data in memory.
- perfect for handling large volumes of data
- more efficient data processing in terms of memory (no need to keep all data in memory) and time (we dont have to wait until all the data is available)
- streams are instance of EventEmitter class
- Readable streams
    - streams from which we can read (consume) data
    - example - http request, fs read streams
    - importand events - data, end
    - importand functions - pipe(), read()
- Writable streams
    - streams from which we can write data
    - example - http response, fs write streams
    - importand events - drain, finish
    - importand functions - write(), end()
- Duplex streams
    - streams that are both readable and writable
    - net websocket
- Transform streams
    - uplex streams that transform data as it is written or read
    - zlip gzip creation

- Back pressure when reading is faster than writting or response cannot send data faster as the data is comming faster

## MODULE SYSTEM
- Each JS file treated as seprated module
- Node.js uses commonJS module system: require(), exports or module.exports;
- ES module system is used in browser: import/export;
- THere have been attempts to bring ES modules to node.js (.mjs)

- when require('test-module') runs
    - `resolving and loading`
        - Starts with core modules
        - If path begins with './' or '../' then try to load developer module
        - If no file found, try to find folder with index.js in it
        - Else go to node_modules/ and try to find module there
    - `wrapping`
        - load the code of module and wrap in under IIFE function and give access of the variable to our code also i.e. wraps whole code in function
        - (function(exports, require, module, __filename, __dirname){});
        - each module have its private scope. i.e. the same name variable we are using will not get overwriten by modules vars.
    - `execution`
        - code runs in the module
    - `returning exports`
        - require function return exports of the required modules
        - module.exports is the returned object
        - use `module.exports` to export one single variable, class or function eg. module.exports = calculator
        - use `exports` to export multiple named variable
        (exports.add = (a,b) => a+b)
    - `caching`
        - cached the executed result