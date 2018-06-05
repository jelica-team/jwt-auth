exports.up = function (knex) {
  return knex.schema.createTable('orders', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('user_id').references('id').inTable('users').notNullable();
    t.integer('client_id').references('id').inTable('users');
    t.string('address').notNullable();
    t.string('description').notNullable();
    t.float('latitude').notNullable();
    t.float('longitude').notNullable();
    t.float('rating');
    t.string('short_link');
    t.bigInteger('created_at').defaultTo(knex.raw('round(extract(epoch from now())) * 1000'));
    t.bigInteger('updated_at').defaultTo(knex.raw('round(extract(epoch from now())) * 1000'));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
