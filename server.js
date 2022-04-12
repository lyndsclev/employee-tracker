const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const viewAllEmployees = 'SELECT employee.id, employee.first_name AS "First Name", employee.last_name AS "Last Name", role.title as Title, role.salary as Salary, department.name AS Department, m.first_name AS Manager FROM employee INNER JOIN role ON employee.role_id=role.id INNER JOIN department ON role.department_id=department.id LEFT JOIN employee m ON employee.manager_id=m.id';


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
    db.promise().query('SELECT * FROM department')
    .then( ([rows, fields]) => {
        console.table('All Departments', rows);
    })
    .then( () => {
        start()
    });
};

// function to view all roles 
const viewRoles = () => {
    db.promise().query('SELECT * FROM role')
    .then( ([rows, fields]) => {
        console.table('All Roles', rows);
    })
    .then( () => {
        start()
    });
};

// function to view all employees 
const viewEmployees = () => {
    db.promise().query(viewAllEmployees)
    .then( ([rows, fields]) => {
        console.table('All Employees', rows);
    })
    .then( () => {
        start()
    });
};

// function to add a department 
const addDepartment = () => {
    inquirer.prompt(
        {
            name: 'name', 
            type: 'input', 
            message: 'Enter new department name'
        }
    )
    .then((response) => {
        db.query('INSERT INTO department SET ?', {
            name: response.name
        },
        (err, res) => {
            if(err) throw err; 
            console.log('Department added!')
            start(); 
        });
    });
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