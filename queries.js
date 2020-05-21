const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'professor_reviews_api',
  password: process.env.DBPASSWORD,
  port: 5432,
});

