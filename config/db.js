const { createPool } = require('mysql2');

const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'passcode', // plzz replace  Your mysql password
  port: 3306,
  database: 'schooldb', //plzz replace  your database name  
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to database...');
    connection.release();
  }


});

module.exports = pool;
