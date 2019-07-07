// TODO: 待理解注释
if (typeof Promise === 'undefined') { 
  require('promise/lib/rejection-tracking').enable()
  window.Promise = require('promise/lib/es6-extensions')
}

// fetch() profill
require('whatwg-fetch')