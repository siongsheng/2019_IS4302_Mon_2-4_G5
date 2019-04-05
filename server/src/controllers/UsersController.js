var axios = require('axios')

module.exports = {
	async buyer (req, res, next) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Buyer`)

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

	async sellers (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Seller`)

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

	async seller (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Seller/${req.body.seller_id}`)

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

	async logisticss (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Logistics`)

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

	async logistics (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Logistics/${req.body.logs_id}`)

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

	async getWallet (req, res) {
		try {
			let result = await axios.get(`${req.composerAddress}:${req.port}${req.namespace}Wallet`)

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

	async postWallet (req, res) {
		try {
			let tx, myself
			if (req.body.amount > 0) {
				tx = 'TopUpFundsTx'
			} else {
				req.body.amount = Math.abs(req.body.amount)
				tx = 'WithdrawFundsTx'
			}
			let user = await axios.get(`${req.composerAddress}:${req.port}/api/system/ping`)
			myself = user.data.participant
			let result = await axios.post(`${req.composerAddress}:${req.port}${req.namespace}${tx}`,
										{
											amount: req.body.amount,
											owner: myself
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
