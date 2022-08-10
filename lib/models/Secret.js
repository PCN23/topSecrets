const pool = require('../utils/pool');

class Secret {
  id;
  title;
  description;
  created_at;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.created_by = row.created_by;
  }
    
    static async insert(secret) {
        const { rows } = await pool.query(
            'INSERT INTO secrets()'
        )
    }
}
