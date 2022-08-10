const pool = require('../utils/pool');

class Secret {
  id;
  title;
  description;
    created_at;
    
    constructor(row) {
        this.id = row.id;
        this.title = row.title;

    }
}
