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
