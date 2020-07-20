require('dotenv').config();

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
const test = process.env.MONGODB_URI_TEST;

module.exports = {
    port,
    mongodb: uri,
    mongodbTest: test,
    test: {
        connection: 'mongodb://localhost:27017/nmtucker2',
    },
    development: {
        connection: 'mongodb://localhost:27017/nmtucker2',
    },
    staging: {
        connection: 'mongodb+srv://nmtucker2:UwXFICD6wjfBxJfb@cluster0-mgpfh.mongodb.net/test?retryWrites=true&w=majority',
    },
    production: {
        connection: 'mongodb+srv://nmtucker2:UwXFICD6wjfBxJfb@cluster0-mgpfh.mongodb.net/test?retryWrites=true&w=majority',
    }
}