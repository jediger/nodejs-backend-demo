var db = require('../db');

module.exports = {
  getAllBirds: function() {
    return db.query('SELECT * FROM birds');
  },
  getBird: function(id) {
    return db.get('SELECT * FROM birds WHERE id = ?', [id]);
  },
  addBird: function(name) {
    return db.add('birds', {name: name});
  }
};
