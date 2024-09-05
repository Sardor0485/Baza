const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Подключение к базе данных
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydatabase'
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL server!');
});

// Маршрут для получения данных
app.get('/', (req, res) => {
    // Выполняем запрос к базе данных
    connection.query('SELECT * FROM fruit ORDER BY name', (error, results) => {
        if (error) throw error;

        // Отображаем данные в HTML
        res.send(`
            <!DOCTYPE html>
<html>
<head>
    <title>Fruit</title>
    <link rel="stylesheet" href="style.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
   <h2>Database Fruit</h2>
    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
        </tr>
        ${results.map(row => `
            <tr>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.price}</td>
            </tr>
        `).join('')}
    </table>


<style>



table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

</style>
</body>
</html>
        `);//query
    });//map
});//get 

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
