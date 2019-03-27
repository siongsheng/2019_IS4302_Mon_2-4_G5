var Express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      proxy = require('express-http-proxy');

let App = Express();
App.use(bodyParser.json());

//static files
//App.use(Express.static('html'));

//reverse proxy
App.use('/hlf', proxy('localhost:3001/'))

let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`));
