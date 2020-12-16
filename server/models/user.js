const db = require('../util/database');

module.exports = class User {
  constructor(fName,lName, email, password) {
    this.fName = fName;
    this.lName = lName;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute('SELECT * FROM users WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (first_name,last_name, email, password) VALUES (?, ?, ?, ?)',
      [user.fName,user.lName, user.email, user.password]
    );
  }
};
