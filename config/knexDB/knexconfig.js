const knex = require('knex');
const knexDb = knex ({client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'postgres',
        password: 'ef91ckut',
        database: 'jwt_auth'
    }
});
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knexDb);
db.plugin(securePassword);

module.exports = db;
