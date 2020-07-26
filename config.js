require('dotenv').config();

module.exports = {
    test: {
        connection: 'mongodb://localhost:27017/nmtucker2',
        port: 5000,
    },
    develop: {
        connection: 'mongodb+srv://nmtucker2:UwXFICD6wjfBxJfb@cluster0-mgpfh.mongodb.net/test?retryWrites=true&w=majority',
        port: 5000,
    },
    staging: {
        connection: 'mongodb+srv://nmtucker2:UwXFICD6wjfBxJfb@cluster0-mgpfh.mongodb.net/test?retryWrites=true&w=majority',
        port: 5000,
    },
    production: {
        connection: 'mongodb+srv://nmtucker2:UwXFICD6wjfBxJfb@cluster0-mgpfh.mongodb.net/test?retryWrites=true&w=majority',
        port: 5000,
    },
}