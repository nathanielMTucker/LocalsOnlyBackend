const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const env = config[process.env.NODE_ENV];

const app = express();

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE, 'somehost.com'],
        'style-src': [SELF, 'mystyles.net'],
        'img-src': ['data:', 'images.com'],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));
mongoose.connect(env.connection,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        autoIndex: false
    }
).catch(err => console.error("Unable to connect to database: " + err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

const localsGet = require('./routes/locals/locals.get');
const localsPost = require('./routes/locals/locals.post');
const localsDelete = require('./routes/locals/locals.delete');
const localPut = require('./routes/locals/locals.put');
app.use('/locals', localsGet, localsPost, localsDelete, localPut);

const userGet = require('./routes/user/user.get');
const userPost = require('./routes/user/user.post');
const userDelete = require('./routes/user/user.delete');
const userPut = require('./routes/user/user.put');
app.use('/user', userGet, userDelete, userPost, userPut);

const mapGet = require('./routes/map/map.get');
app.use('/map', mapGet);

app.listen(config.port, () => {
    console.log(`Server is running on port: ${config.port}`);
});