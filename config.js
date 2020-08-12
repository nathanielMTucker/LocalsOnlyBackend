require('dotenv').config();

// const port = process.env.PORT || 5000;
// const uri = process.env.MONGODB_URI;
// const test = process.env.MONGODB_URI_TEST;
// const AWS_ACCESS_KEY = "AKIAIXNXV3UNV63Q6N4Q"
// const AWS_SECRET_KEY = "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"
// const AWS_BUCKET = "localsonlyimages"

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
        port: process.env.PORT
    }
}