var Express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		// proxy = require('express-http-proxy'),
		// httpProxy = require('http-proxy'),
		cors = require('cors')

let App = Express()
let router = Express.Router()
//App.use(router)
App.use(cors())
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended: false}))
App.use(router)

//static files
//App.use(Express.static('html'));

//reverse proxy
// App.use('/', proxy(`localhost:${port}/`))
// let buyerServer = 'http://localhost:3001',
//     sellerServer = 'http://localhost:3002',
//     logs1Server = 'http://localhost:3003',
//     logs2Server = 'http://localhost:3004'

// var proxy = httpProxy.createProxyServer();
// App.all("/buyer1/*", function(req, res) {
//     console.log('redirecting to buyer1');
//     proxy.web(req, res, {target: buyerServer});
// })
// App.all("/seller1/*", function(req, res) {
//     console.log('redirecting to seller1');
//     proxy.web(req, res, {target: sellerServer});
// })
// App.all("/logs1/*", function(req, res) {
//     console.log('redirecting to logs1');
//     proxy.web(req, res, {target: logs1Server});
// })
// App.all("/logs2/*", function(req, res) {
//     console.log('redirecting to logs2');
//     proxy.web(req, res, {target: logs2Server});
// })

router.param('user', function(req, res, next, user) {
	let port, user_id
	switch(user) {
			case 'buyer1@test.com':
				user_id = 'b1'
				port = 3001;
				break;
			case 'seller1@test.com':
				user_id = 's1'
				port = 3002;
				break;
			case 'logs1@test.com':
				user_id = 'l1'
				port = 3003;
				break;
			case 'logs2@test.com':
				user_id = 'l2'
				port = 3004;
				break;
			}
	req.port = port
	req.user_id = user_id
	next()
})

router.route('/:user').all(function(req, res, next) {
	console.log('port ' + req.port)
	next()
})

require('./routes')(router)

let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`))
