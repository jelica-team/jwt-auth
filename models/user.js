const db = require('../database/app.js');

const User = db.Model.extend({
  tableName: 'login_user',
  hasSecurePassword: true
});

module.exports = User;
