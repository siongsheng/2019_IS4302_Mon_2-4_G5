var axios = require('axios')
var currUser = require('../config').currUser

module.exports = {
	async buyer (req, res) {
		try {
			// axios.get('/api/system/ping')
			// axios.get('http://localhost:${buyer1}/api/org.deliverlor.ecommerce.Buyer')
			// 	.then(function(response){
			// 		console.log(response.data)
			// 		myself = response.data.participant
			// 		console.log(response.status)
			// 	}).catch(function(){
			// 		console.log('err');
			// 	})

			let result = await axios.get(`http://localhost:${currUser}/api/org.deliverlor.ecommerce.Buyer`)

			res.send({
				message: 'testmessage',
				myself: result.data[0]
			})
		} catch (err) {
			res.status(400).send({
				error: err,
				currUser: currUser
			})
		}
	},

	async seller (req, res) {
		try {
			let result = await axios.get(`http://localhost:${currUser}/api/org.deliverlor.ecommerce.Seller`)

			res.send({
				message: 'testmessage',
				myself: result.data[0]
			})
		} catch (err) {
			res.status(400).send({
				error: 'Error'
			})
		}
	},

	async logistics (req, res) {
		try {
			let result = await axios.get(`http://localhost:${currUser}/api/org.deliverlor.ecommerce.Logistics`)

			res.send({
				message: 'testmessage',
				myself: result.data[0]
			})
		} catch (err) {
			res.status(400).send({
				error: 'Error'
			})
		}
	}
}