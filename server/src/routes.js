const UsersController = require('./controllers/UsersController')
const OrderController = require('./controllers/OrderController')

module.exports = (router) => {
	router.get('/:user/buyer', UsersController.buyer)
	router.get('/:user/seller', UsersController.seller)
	router.get('/:user/logistics', UsersController.logistics)
	router.route('/:user/wallet')
		.get(UsersController.getWallet)
		.post(UsersController.postWallet)

	router.route('/:user/product')
		.get(OrderController.products)
		.post(OrderController.postProduct)
	router.get('/:user/product/:product_id', OrderController.product)
	router.param('product_id', function(req, res, next, product_id) {
		req.body.product_id = product_id
		next();
	});

	router.route('/:user/order')
		.get(OrderController.orders)
		.post(OrderController.createOrderTx)
	router.get('/:user/order/:order_id', OrderController.order)
	router.param('order_id', function(req, res, next, order_id) {
		req.body.order_id = order_id
		next();
	});

	router.get('/:user/logisticsrequest', OrderController.logisticsrequests)
	router.get('/:user/logisticsrequest/:logisticsRequest_id', OrderController.logisticsrequest)
	router.param('logisticsRequest_id', function(req, res, next, logisticsRequest_id) {
		req.body.logisticsRequest_id = logisticsRequest_id
		next();
	});

	router.post('/:user/offerTx', OrderController.offerTx)
	router.post('/:user/acceptOfferTx', OrderController.acceptOfferTx)
	router.post('/:user/productHandoverTx', OrderController.productHandoverTx)
	router.post('/:user/productDeliveredTx', OrderController.productDeliveredTx)
}
