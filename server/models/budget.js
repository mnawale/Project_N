const db = require('../util/database');

module.exports = class Budget {
  constructor(userId, title, value, month,tags) {
    this.userId = userId;
    this.title = title;
    this.value = value;
    this.month = month;
    this.tags = tags;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM budget');
              
  }
  static fetchBudget(userId) {
    return db.execute('SELECT * FROM budget WHERE user_id = ?',[userId]);
              
  }
  
  static save(budget) {
    return db.execute(
      'INSERT INTO budget (user_id,title, budget, month,tags) VALUES (?, ?, ?, ?, ?)',
      [budget.userId,budget.title, budget.value, budget.month,budget.tags]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM budget WHERE id = ?', [id]);
  }
};
