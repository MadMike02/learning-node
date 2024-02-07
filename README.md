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