module.exports = {
	async product (req, res) {
		try {
			res.send({
				message: 'testmessage',
			})
		} catch (err) {
			res.status(400).send({
				error: 'Error'
			})
		}
	},

	async order (req, res) {
		try {
			res.send({
				message: 'testmessage',
			})
		} catch (err) {
			res.status(400).send({
				error: 'Error'
			})
		}
	},

	async logisticsrequest (req, res) {
		try {
			res.send({
				message: 'testmessage',
			})
		} catch (err) {
			res.status(400).send({
				error: 'Error'
			})
		}
	}
}