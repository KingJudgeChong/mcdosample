// index.js

// Require dependencies
require('dotenv').config();
const express = require('express');

// Create an instance of the express application
const app = express();

const cors = require("cors")

const bodyParser = require("body-parser");

app.use(
    cors(
        {origin: ["http://localhost:3000"],
    }))

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: true,
    })
);
// Use express.json() to parse JSON bodies into JS objects
app.use(express.json())

// Define routes
const  Pool = require("pg").Pool  
const  pool = new  Pool({
	user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
})
module.exports = pool

app.post('/location', async (request, response) => {
    try {
      const { location } = request.body;
  
      if (!location) {
        return response.status(400).json({ error: 'Location is required' });
      }
  
      const result = await pool.query(
        'INSERT INTO location (name) VALUES ($1) RETURNING location_id, name',
        [location]
      );
  
      response.status(201).json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      response.status(500).json({ error: 'Internal server error' });
    }
  });

app.get("/products", async (request, response) => {
    try {
    const productList = await pool.query(
        "SELECT * FROM product_details",
        [],
         )
         response.json(productList.rows)
    }
    catch (error) {
        console.error(error)
    }
})
  

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});