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
  - '\*' - accepts all version when updated

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
    - (function(exports, require, module, **filename, **dirname){});
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

## ASYNCHRONOUS JS

- TO avoid callback hell we can use promises to handle asnchrous methods callback.
- Way 1:
  - We can create promise using `new Promise()` constructor which takes two argument `resolve` and `reject` method. The resolve marks promise as fulfilled and reject mark it as rejected or error.
  - Then we use promise chaining in which the second promise is returned when the first promise is fullfiled and so on.
  - for ex -- promise.then(return promise).then(output2)
- way 2:
  - instead of promise chaining we can use async & await.
  - the await keyword wait for the promise to return a result i.e. resolved and then gives the output
  - wrap the whole await in the try catch to make it non blocking and get the error in the catch block when promise fails.

## REST APIs

- `API` - Application Programming Interface: a piece of software that can be used by another piece of software, in order to allow applications to talk to each other.

- `Rest Architecture`
  - Seprate API into logical resources
  - Exporse structured, resource-based URLs
  - User HTTP methods (verbs)
    - don't use endpoint names as `createUser`, `getUser` instead `GET /users` and `POST /users` or `DELETE /users/2` or `PUT users/3`
  - Send data as JSON (usually)
  - Be stateless
    All state is handled on the client. This means that each request cotain all the information necessary to process a certain request. The server should not have to remember previous requests.

### STATUS CODES

200 - success
201- created
400 - user input error
404- not found
500- internal server error

## MONGO DB

### DOcument structure

- BSON: Data format MongoDB users for data storage. Like JSON, but typed (i.e. have data typed). So MondoDB documents are typed.
- Embedding/ Denormalizing: Including related data into a single document. This allows for quicker access and easier data modules (it;s not always the best solution though.)
- Unline in Relational database the data is normalized i.e. is seprated in different tables.

### BASIC COMMANDS

`use databaseName` - switch or create new DB.
`db.collectionName.insertOne({ name: "test1", price: 283, rating: 4.7})` - create a collection and insert data
`db.collectionName.find()` -- give all documents
`show dbs` - show all databases
`show collections` - show collections

### CREATING DOCUMENTS

`db.collectionName.insertOne({ name: "test1", price: 283, rating: 4.7})`
`db.collectonName.insertMany([{}, {}])`

### READING DOCUMENTS

- `db.collectionName.find()` -- all collecions
- `db.collectionName.find({name: 'test' })` -- search by name field
- `db.collectionName.find({price: {$lte: 500} })` -- query operators
- `db.collectionName.find({price: {$lt: 500}, rating: {$gt: 4.8} })` -- And conditions
- `db.collectionName.find( {$or: [ {price: {$lt: 500}}, {rating: {$gte: 4.8 } } ]} )` -- or conditions
- `db.collectionName.find( {$or: [ {price: {$lt: 500}}, {rating: {$gte: 4.8 } } ]}, {name: 1} )` -- projection i.e only give name field in output

### Updating documents

- `db.collectionName.updateOne( {name: "test1"}, { $set: {price: 597} } )` --- search object by name and update price of that. If multiple records found then update first one.
- `db.collectionName.updateMany( {price: {$gte: 500}, rating: {$gt: 4.8} }, {$set: {premium: true} } )` --- update all records

### Delete documens

- `db.collectionName.deleteMany( {rating: {$lt: 4.8}} )` --- delete all records acording to given condition
- `db.collectionName.deleteMan({})` -- delete all collections

## MONGOSSE

- Mongoose is a Object Data Modeling(ODM) library for MongoDB and Node.js, a higher level of abstraction.
- Mongoose allows for rapid and simple development of mongoDB database interacions;
- Features: schemas to model data and relationships, easy data validation, simple query API, middleware ,etc;
- `Mongoose schema` : Where we model our data, by describing the structure of the data, data values, and validation;
- `Mongoose model` : a wrapper for the schema, providing an interface to the database for CRUD operations.

### MONGOOSE MODEL

```
const ModelName = mongoose.model('ModelName', schema)
```

- `Inserting data`
  ```
  const data = new ModelName({
    name: ...
  })
  data.save()
  ```
