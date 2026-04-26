// lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Vide par défaut sur XAMPP
  database: 'botmath_os',
  port: 3306 // Vérifiez ce numéro dans votre panneau XAMPP (colonne Ports)
});

export default pool;