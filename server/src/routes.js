const UsersController = require('./controllers/UsersController')
const OrderController = require('./controllers/OrderController')

module.exports = (router) => {
	router.get('/:user/buyer', UsersController.buyers)
	router.get('/:user/buyer/:buyer_id', UsersController.buyer)
	router.param('buyer_id', function(req, res, next, buyer_id) {
		req.body.buyer_id = buyer_id
		next();
	});
	router.get('/:user/seller', UsersController.sellers)
	router.get('/:user/seller/:seller_id', UsersController.seller)
	router.param('seller_id', function(req, res, next, seller_id) {
		req.body.seller_id = seller_id
		next();
	});
	router.get('/:user/logistics', UsersController.logisticss)
	router.get('/:user/logistics/:logs_id', UsersController.logistics)
	router.param('logs_id', function(req, res, next, logs_id) {
		req.body.logs_id = logs_id
		next();
	});

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
