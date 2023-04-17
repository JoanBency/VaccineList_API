const express = require('express')
const sls = require('serverless-http')
const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();
const app = express()

const pool = mysql.createPool({
  host: "vaccineclinic.cl0vr2rsrsf5.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "joanneben007",
  database: "vaccineclinic",
});

app.get('/availvaccines', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Content-Type', 'application/json');
  pool.getConnection(function(err, connection) {
    connection.query(`SELECT * FROM vaccineclinic.VaccineList where Doses>0`, function(error, result, fields) {
        connection.release();

        if (error) throw error;
        if (result) res.send(result);
    });
  });
})

module.exports.server = sls(app)