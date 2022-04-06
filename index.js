const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// db connection 
const connectDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company'
});

// function to start app 
const startPrompts = () => {}

// call db connection & start app 
connectDb.connect((err) => {
    if(err) throw err; 
    startPrompts(); 
});