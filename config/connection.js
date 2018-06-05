const development = {
  database: 'jwt_auth',
  username: 'postgres',
  password: 'ef91ckut',
  host: '127.0.0.1',
  dialect: 'postgres',
};

const testing = {
  database: 'jwt_auth',
  username: 'postgres',
  password: 'ef91ckut',
  host: '127.0.0.1',
  dialect: 'postgres',
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: 'postgres',
};

module.exports = {
  development,
  testing,
  production,
};
