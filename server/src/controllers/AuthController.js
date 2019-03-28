var admin = require('firebase-admin')
var firebase = require('firebase')
//import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyBa0fx4Rvdr3YdnvPKQriJ5c3XzaPUwmI4',
    authDomain: 'is4302.firebaseapp.com',
    databaseURL: 'https://is4302.firebaseio.com',
    projectId: 'is4302',
    storageBucket: 'is4302.appspot.com',
    messagingSenderId: '332381728433'
}

const firebaseApp = firebase.initializeApp(config)

var serviceAccount = require('../is4302-firebase-adminsdk-1xsnn-240513df3c.json')
var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://is4302.firebaseio.com'
})

const db = firebaseApp.firestore()

var port = 3000;

module.exports = {
    async login(req, res) {
        try {
            db.collection('users').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    //console.log(doc.data().email)
                    if (doc.data()) {
                        switch (doc.data().email) {
                            case 'buyer1@test.com':
                                port = 3001;
                                break;

                            case 'seller1@test.com':
                                port = 3002;
                                break;

                            case 'logs1@test.com':
                                port = 3003;
                                break;

                            case 'logs2@test.com':
                                port = 3004;
                                break;
                        }
                    }
                });
                console.log('the port is ' + port)
            });
            res.send({
                message: 'User found',
            })
        } catch (err) {
            res.status(400).send({
                error: 'Error. Cannot find user'
            })
        }
    }
}
