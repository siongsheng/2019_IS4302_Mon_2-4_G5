const UsersController = require('./controllers/UsersController')
const OrderController = require('./controllers/OrderController')

module.exports = (router) => {
	router.get('/:user/buyer', UsersController.buyer)
	router.get('/:user/seller', UsersController.sellers)
	router.get('/:user/seller/:seller_id', UsersController.seller)
	router.param('seller_id', function(req, res, next, seller_id) {
		req.body.seller_id = seller_id
		next()
	})
	router.get('/:user/logistics', UsersController.logisticss)
	router.get('/:user/logistics/:logs_id', UsersController.logistics)
	router.param('logs_id', function(req, res, next, logs_id) {
		req.body.logs_id = logs_id
		next()
	})

	router.route('/:user/wallet')
		.get(UsersController.getWallet)
		.post(UsersController.postWallet)

	router.route('/:user/product')
		.get(OrderController.products)
		.post(OrderController.postProduct)
	router.route('/:user/product/:product_id')
		.get(OrderController.product)
		.put(OrderController.putProduct)
	router.param('product_id', function(req, res, next, product_id) {
		req.body.product_id = product_id
		next()
	})

	router.route('/:user/order')
		.get(OrderController.orders)
		.post(OrderController.createOrderTx)
	router.get('/:user/order/:order_id', OrderController.order)
	router.param('order_id', function(req, res, next, order_id) {
		req.body.order_id = order_id
		next()
	})

	router.get('/:user/logisticsrequest', OrderController.logisticsrequests)
	router.route('/:user/logisticsrequest/:logisticsRequest_id')
		.get(OrderController.logisticsrequest)
		.put(OrderController.putLogisticsrequest)
	router.param('logisticsRequest_id', function(req, res, next, logisticsRequest_id) {
		req.body.logisticsRequest_id = logisticsRequest_id
		next()
	})

	router.put('/:user/offerTx', OrderController.offerTx)
	router.post('/:user/acceptOfferTx', OrderController.acceptOfferTx)
	router.post('/:user/productHandoverTx', OrderController.productHandoverTx)
	router.post('/:user/productDeliveredTx', OrderController.productDeliveredTx)
}
