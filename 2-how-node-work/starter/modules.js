// console.log(arguments);

//gives wrapper
// console.log(require('module').wrapper);

const MyCalcultor = require('./calculator')
const calc1 =new MyCalcultor();
console.log(calc1.add(2,5))

const {add, multiply} = require('./testmodule-2')
console.log(add(2,5))

//caching
//first time run full code
require('./test-module-3')();
//second time loaded from cache
require('./test-module-3')();
//third time loaded from cache

require('./test-module-3')();