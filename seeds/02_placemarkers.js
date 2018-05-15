
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('placemarkers').del()
    .then(function () {
      // Inserts seed entries
      return knex('placemarkers').insert([
        {id: 1, user_id: 1, latitude: 59.94653298, longitude: 30.26007628, hintContent: 'HintOne', balloonContent: 'BalloonOne'},
        {id: 2, user_id: 2, latitude: 59.84653298, longitude: 30.26007628, hintContent: 'HintTwo', balloonContent: 'BalloonTwo'}
      ]);
    });
};
