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
											name: req.query.name,
											price: req.query.price,
											description: req.query.description,
											stock: req.query.stock,
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
											quantity: req.query.quantity,
											desiredPrice: req.query.desiredPrice,
											buyer: req.user_id,
											product: req.query.product
										})

			res.send({
				message: 'success',
				result: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: result
			})
		}
	},

	async offerTx (req, res) {
		if (typeof(req.query.remark) == 'undefined' || req.query.remark == '') {
			req.query.remark = 'NIL'
		}
		try{
			var result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.OfferTx`,
										{
											offerPrice: req.query.offerPrice,
											created: new Date(),
											remark: req.query.remark,
											logistics: req.query.logistics,
											logisticsRequest: req.query.logisticsRequest
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
											confirmedDeliverer: req.query.confirmedDeliverer,
											logisticsRequest: req.query.logisticsRequest
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
											order: req.query.order
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
											order: req.query.order
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