const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

class MongooseConnection {

    constructor () {
        const {
            MONGODB_URI,
            MONGODB_UNAME,
            MONGODB_PW,
            CA_CERT
        } = process.env

        this.dbAuth = {
            keepAlive: true,
            reconnectTries: Number.MAX_VALUE,
            user: MONGODB_UNAME,
            pass: MONGODB_PW,
            useNewUrlParser: true,
            ssl: true,
            sslValidate: false,
            sslCert: CA_CERT
        }

        this.URI = MONGODB_URI
    }

    async createConnection () {
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useUnifiedTopology', true);
        this.connection = await mongoose.connect(this.URI, this.dbAuth)
    }

    manageConnection () {
        mongoose.connection.on('disconnected', this.sendError)
        mongoose.connection.on('error', this.sendError)
    }

    sendError (err) {
        console.error(err)
    }

    async close () {
        return await mongoose.connection.close()
    }

}

module.exports = MongooseConnection