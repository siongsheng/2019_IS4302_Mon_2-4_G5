var currUser = require('./config').currUser

var Express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      proxy = require('express-http-proxy'),
      cors = require('cors')

let App = Express()
App.use(cors())
App.use(bodyParser.urlencoded({extended: false}))
App.use(bodyParser.json())

//static files
//App.use(Express.static('html'));

// TODO: set currUser after he login
const buyer1 = '3001',
	seller1 = '3002',
	logs1 = '3003',
	logs2 = '3004'

//reverse proxy
App.use('/hlf', proxy(`localhost:${currUser}/`))

require('./routes')(App)

let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`))