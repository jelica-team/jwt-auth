
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('login_user').del()
    .then(function () {
      // Inserts seed entries
      return knex('login_user').insert([
        {id: 1, email: 'test@gmail.com', password_digest: '$2a$12$VJLgvy9K9W4moBBOj.xevezvK2OJNodka1hRPLybuIMGKluazapd6'},
        {id: 2, email: 'saw@gmail.com', password_digest: '$2a$12$bLQnzbo/ZxvcG7XhHw9Ttu/RG85EWwBa2ZMEj.0/BgRHaDp35tDM.'},
        {id: 3, email: 'gena@gmail.com', password_digest: '$2a$12$mGrbTlknFXBdHquoD9eLc.31h7Gg3iA44JldUIFcssEQn0ja/CnkK'}
      ]);
    });
};
