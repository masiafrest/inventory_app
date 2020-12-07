const knex = require('knex');
const { Model } = require('objection');

console.log('db.js')
const knexConfig = require('../knexfile');

const enviroment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[enviroment]

console.log('db.js connect to ', enviroment);
const connection = knex(connectionConfig);

Model.knex(connection);
console.log('knex pass to objection model')

module.exports = connection;