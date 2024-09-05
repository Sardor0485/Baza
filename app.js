const mysql = require('mysql2');

// Создаем соединение с базой данных
const pool = mysql.createPool({
  host: 'localhost', // Хост, где работает MariaDB
  user: 'root', // Пользователь базы данных
  password: '',
  database: 'mydatabase'
});

// Выполняем запрос
pool.query('SELECT * FROM fruit', (err, results) => {
  if (err) {
    console.error(err);
  } else {
    console.log(results); // Выводим результаты запроса
  }
});
