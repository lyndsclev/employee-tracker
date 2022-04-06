const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// db connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'company'
});

// function to start app 
const start = () => {
    inquirer.prompt({
        name: 'options', 
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
        ]
    })
    .then((response) => {
        switch (response.options) {
            case 'View all departments':
                viewDepartments();
                break; 

            case 'View all roles':
                viewRoles();
                break; 

            case 'View all employees':
                viewEmployees();
                break; 

            case 'Add a department':
                addDepartment(); 
                break; 

            case 'Add a role': 
                addRole();
                break; 

            case 'Add an employee':
                addEmployee();
                break; 

            case 'Update an employee role':
                updateEmployeeRole();
                break; 
            
            case 'Quit': 
                db.end(); 
                break;
        }
    });
};

// function to view all departments 
viewDepartments();

// function to view all roles 
viewRoles();

// function to view all employees 
viewEmployees();

// function to add a department 
addDepartment(); 

// function to add a role 
addRole();

// function to add an employee
addEmployee();

// function to update an employee role 
updateEmployeeRole();

// call db connection & start app 
db.connect((err) => {
    if(err) throw err; 
    start(); 
});