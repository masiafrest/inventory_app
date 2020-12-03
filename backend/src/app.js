const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const project = require('./constants/project');

const app = express();

app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: project.message
    })
})

module.exports = app