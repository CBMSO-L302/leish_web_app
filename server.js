const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Static files from specific folders
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// HTML files in the "pages" folder
app.use('/', express.static(path.join(__dirname, 'pages')));

// Open the SQLite database from the correct path
const db = new sqlite3.Database(path.join(__dirname, 'data/sql/leishmania.db'), (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

app.get('/search', (req, res) => {
    const query = req.query.q || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;  // Default limit of 50 rows per page
    const offset = (page - 1) * limit;

    const sql = `
        SELECT * FROM infantum 
        WHERE Gene_ID LIKE ? 
        OR Name LIKE ? 
        OR Other_names LIKE ? 
        OR Wikidata LIKE ? 
        OR Mendeley LIKE ? 
        OR UniProt LIKE ? 
        OR LmjF_ortholog LIKE ? 
        OR LmjFC_ortholog LIKE ? 
        OR LdHU3_ortholog LIKE ? 
        OR LBRM2904_ortholog LIKE ?
        LIMIT ? OFFSET ?;
    `;

    const params = Array(10).fill(`%${query}%`);
    params.push(limit, offset);

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).send('Error querying database');
        } else {
            res.json(rows);
        }
    });
});

// Start the server
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});