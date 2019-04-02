var axios = require('axios')

module.exports = {
	async getProduct (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Product`)

			res.send({
				message: 'success',
				products: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async postProduct (req, res) {
		try {
			let result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Product`,
										{
											Id: 'id'+Date.now().toString(),
											name: req.body.name,
											price: req.body.price,
											description: req.body.description,
											stock: req.body.stock,
											seller: req.user_id
										})

			res.send({
				message: 'success',
				products: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async order (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Order`)

			res.send({
				message: 'success',
				orders: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async logisticsrequest (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.LogisticsRequest`)

			res.send({
				message: 'success',
				logisticsRequests: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async createOrderTx (req, res) {
		try {
			var result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.CreateOrderTx`,
										{
											Id: 'id'+Date.now().toString(),
											quantity: req.body.quantity,
											desiredPrice: req.body.desiredPrice,
											buyer: req.body.buyer,
											product: req.body.product
										})

			res.send({
				message: 'success',
				result: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async offerTx (req, res) {
		if (typeof(req.body.remark) == 'undefined' || req.body.remark == '') {
			req.body.remark = 'NIL'
		}
		try{
			var result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.OfferTx`,
										{
											Id: 'id'+Date.now().toString(),
											offerPrice: req.body.offerPrice,
											created: new Date(),
											remark: req.body.remark,
											logistics: req.body.logistics,
											logisticsRequest: req.body.logisticsRequest
										})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}

		res.send({
			message: 'success',
			result: result.data
		})
	},

	async acceptOfferTx (req, res) {
		try {
			var result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.AcceptOfferTx`,
										{
											confirmedDeliverer: req.body.confirmedDeliverer,
											logisticsRequest: req.body.logisticsRequest
										})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
		res.send({
			message: 'success',
			result: result.data
		})
	},

	async productHandoverTx (req, res) {
		try {
			let result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.ProductHandoverTx`,
										{
											order: req.body.order
										})

			res.send({
				message: 'success',
				result: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async productDeliveredTx (req, res) {
		try {
			let result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.ProductDeliveredTx`,
										{
											order: req.body.order
										})

			res.send({
				message: 'success',
				result: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	}
}
