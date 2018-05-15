
exports.up = function(knex, Promise) {
  return knex.schema.createTable('placemarkers', function(table) {
  	table.increments();
  	table.integer('user_id').references('id').inTable('login_user');
  	table.float('latitude').notNullable();
  	table.float('longitude').notNullable();
  	table.string('hintContent');
  	table.string('balloonContent').notNullable();
  	table.timestamp('created_at').defaultTo(knex.fn.now());
  	table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('placemarkers');
};
