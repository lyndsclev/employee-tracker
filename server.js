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
    inquirer.prompt(
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Quit',
                new inquirer.Separator()
            ]
        }
    )
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
                console.log('Goodbye!')
                db.end(); 
                break;
        }
    });
};

// function to view all departments 
const viewDepartments = () => {
    console.log('Viewing all departments');
    start();
};

// function to view all roles 
const viewRoles = () => {
    console.log('Viewing all roles');
    start();
};

// function to view all employees 
const viewEmployees = () => {
    console.log('Viewing all employees');
    start(); 
};

// function to add a department 
const addDepartment = () => {
    console.log('Adding department');
    start(); 
};

// function to add a role 
const addRole = () => {
    console.log('Adding role');
    start();
};

// function to add an employee
const addEmployee = () => {
    console.log('Adding employee');
    start(); 
};

// function to update an employee role 
const updateEmployeeRole = () => {
    console.log('Updating employee');
    start(); 
};

// call db connection & start app 
db.connect((err) => {
    if(err) throw err; 
    start(); 
});