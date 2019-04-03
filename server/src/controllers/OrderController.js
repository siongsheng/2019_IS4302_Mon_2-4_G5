var axios = require('axios')

module.exports = {
	async products (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Product`)

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async product (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Product/${req.body.product_id}`)

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async postProduct (req, res) {
		try {
			let user = await axios.get(`${req.composerAddress}:${req.port}/api/system/ping`)
			myself = user.data.participant
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}Product`,
										{
											Id: 'id'+Date.now().toString(),
											name: req.body.name,
											price: req.body.price,
											description: req.body.description,
											stock: req.body.stock,
											seller: myself
										})

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async orders (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Order`)

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async order (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Order/${req.body.order_id}`)
			
			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async createOrderTx (req, res) {
		try {
			let user = await axios.get(`${req.composerAddress}:${req.port}/api/system/ping`)
			myself = user.data.participant
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}CreateOrderTx`,
										{
											Id: 'id'+Date.now().toString(),
											quantity: req.body.quantity,
											desiredPrice: req.body.desiredPrice,
											buyer: myself,
											product: req.body.product
										})
			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async logisticsrequests (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}LogisticsRequest`)

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async logisticsrequest (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}LogisticsRequest/${req.body.logisticsRequest_id}`)

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async offerTx (req, res) {
		if (typeof(req.body.remark) == 'undefined' || req.body.remark == '') {
			req.body.remark = 'NIL'
		}
		try{
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}OfferTx`,
										{
											offerPrice: req.body.offerPrice,
											created: new Date(),
											remark: req.body.remark,
											logistics: req.body.logistics,
											logisticsRequest: req.body.logisticsRequest
										})
			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message,
			})
		}
	},

	async acceptOfferTx (req, res) {
		try {
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}AcceptOfferTx`,
										{
											confirmedDeliverer: req.body.confirmedDeliverer,
											logisticsRequest: req.body.logisticsRequest
										})
			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async productHandoverTx (req, res) {
		try {
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}ProductHandoverTx`,
										{
											order: req.body.order
										})

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	},

	async productDeliveredTx (req, res) {
		try {
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}ProductDeliveredTx`,
										{
											order: req.body.order
										})

			res.send({
				message: 'success',
				results: result.data
			})
		} catch (err) {
			res.status(err.response.data.error.statusCode).send({
				error: err.toString(),
				message: err.response.data.error.message
			})
		}
	}
}
