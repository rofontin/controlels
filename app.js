const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to MongoDB!!!')
    });

    
require('./api/models/produto');
require('./api/models/unidadeMedida');
require('./api/models/user');


const app = express();

const produtoResources = require('./api/resources/produtos');
const unidadeMedidaResources = require('./api/resources/unidadeMedidas');
const userResources = require('./api/resources/users');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


require('./api/config/passport')(passport);
app.use(passport.initialize());

const cors = (req, res, next) => {
    const whitelist = [
        'http://localhost:8080'
    ];
    const origin = req.header.origin;
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'token,Content-Type,Authorization, x-access-token');
    next();
}
app.use(cors);

app.use('/produto', produtoResources);
app.use('/unidadeMedida', unidadeMedidaResources);
app.use('/user', userResources);

let swaggerSpec = require('./api/config/swagger');
app.use('/api-docs', swaggerUi.serve, 
         swaggerUi.setup(swaggerSpec));


app.use('/api', (req, res, next) => {
    res.status(200).json({
        message: 'Hello word!'
    })
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;