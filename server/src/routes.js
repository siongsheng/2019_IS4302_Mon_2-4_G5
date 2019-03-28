const UsersController = require('./controllers/UsersController')
const OrderController = require('./controllers/OrderController')
const AuthController = require('./controllers/AuthController')

module.exports = (App) => {
	// App.post('/register',
		// controller.register,
		// controller.register)

	App.get('/buyer', UsersController.buyer)
	App.get('/seller', UsersController.seller)
	App.get('/logistics', UsersController.logistics)
	App.get('/product', OrderController.product)
	App.get('/order', OrderController.order)
	App.get('/logisticsrequest', OrderController.logisticsrequest)
	App.get('/login', AuthController.login)
}
