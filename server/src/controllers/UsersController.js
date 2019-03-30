var axios = require('axios')

module.exports = {
	async buyer (req, res, next) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Buyer`)

			res.send({
				message: 'success',
				buyers: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString(),
			})
		}
	},

	async seller (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Seller`)

			res.send({
				message: 'success',
				sellers: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async logistics (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Logistics`)

			res.send({
				message: 'success',
				logs: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async getWallet (req, res) {
		try {
			let result = await axios.get(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.Wallet`)

			res.send({
				message: 'success',
				wallet: result.data
			})
		} catch (err) {
			res.status(400).send({
				error: err.toString()
			})
		}
	},

	async postWallet (req, res) {
		try {
			let tx, myself
			if (req.query.amount > 0) {
				tx = 'TopUpFundsTx'
			} else {
				req.query.amount = Math.abs(req.query.amount)
				tx = 'WithdrawFundsTx'
			}
			let user = await axios.get(`http://localhost:${req.port}/api/system/ping`)
			myself = user.data.participant
			let result = await axios.post(`http://localhost:${req.port}/api/org.deliverlor.ecommerce.${tx}`,
										{
											amount: req.query.amount,
											owner: myself
										})

			res.send({
				message: 'success',
				wallet: result.data
			})
		} catch (err) {
			console.log(err)
			res.status(400).send({
				error: err.toString()
			})
		}
	}
}