var Express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		cors = require('cors')

let App = Express()
let router = Express.Router()

App.use(cors())
router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

App.use(bodyParser.json())
App.use(bodyParser.urlencoded({extended: false}))
App.use(router)

router.param('user', function(req, res, next, user) {
	let port
	switch(user) {
			case 'buyer1@test.com':
				port = 3001;
				break;
			case 'seller1@test.com':
				port = 3002;
				break;
			case 'logs1@test.com':
				port = 3003;
				break;
			case 'logs2@test.com':
				port = 3004;
				break;
			}
	req.composerAddress = 'http://localhost'
	req.port = port
	req.namespace = '/api/org.deliverlor.ecommerce.'
	next()
})

require('./routes')(router)

let port = process.env.PORT || 3000;
App.listen(port, () => console.log(`Server listening on port ${port}!`))
