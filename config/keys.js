// keys.js - use dev.js if in dev environment, env variables if in production environment
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
} else {
  //in dev mode.
  module.exports = require('./dev');
}
