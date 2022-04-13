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
    db.promise().query('SELECT * FROM department')
    .then( ([rows, fields]) => {
        console.log('')
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
        console.log('')
        console.table('All Roles', rows);
    })
    .then( () => {
        start()
    });
};

// function to view all employees 
const viewEmployees = () => {
    db.promise().query('SELECT * FROM employee')
    .then( ([rows, fields]) => {
        console.log('')
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
            console.log('')
            console.log('Department added!')
            console.log('')
            start(); 
        });
    });
};

// function to add a role 
const addRole = () => {
    db.query('SELECT * FROM department', (err, results) => {
        if(err) throw err; 

        inquirer.prompt([
            {
                name: 'department',
                type: 'list', 
                choices: function () {
                    const deptArr = []; 
                    results.forEach(({ id, name }) => {
                        deptArr.push({
                            name: name, 
                            value: id
                        });
                    });
                    return deptArr; 
                }
            },
            {
                name: 'title',
                type: 'input',
                message: 'Enter new role title'
            },
            {
                name: 'salary', 
                type: 'input', 
                message: 'Enter new role salary'
            }
        ])
        .then((response) => {
            db.query('INSERT INTO role SET ?', {
                title: response.title, 
                salary: response.salary,
                department_id: response.department
            },
            (err, res) => {
                if(err) throw err; 
                console.log('')
                console.log('Role added!')
                console.log('')
                start(); 
            });
        });
    });
};

// function to add an employee
const addEmployee = () => {
        db.query('SELECT * FROM role', (err, results) => {
            if(err) throw err; 
    
            inquirer.prompt([
                {
                    name: 'role',
                    type: 'list', 
                    choices: function () {
                        const roleArr = []; 
                        results.forEach(({ title, id }) => {
                            roleArr.push({
                                name: title, 
                                value: id
                            });
                        });
                        return roleArr; 
                    }
                }
            ])
            .then( () => {
                db.query('SELECT * FROM employee', (err, results) => {
                    if(err) throw err; 

                    inquirer.prompt([
                        {
                            name: 'manager', 
                            type: 'list', 
                            choices: function () {
                                const managerArr = []; 
                                results.forEach(({ id, first_name, last_name }) => {
                                    managerArr.push({
                                        name: first_name + ' ' + last_name, 
                                        value: id
                                    });
                                });
                                return managerArr; 
                            }
                        }, 
                        {
                            name: 'firstName', 
                            type: 'input', 
                            message: 'Enter employee first name'
                        },
                        {
                            name: 'lastName',
                            type: 'input', 
                            message: 'Enter employee last name'
                        }
                    ])
                    .then((response) => {
                        db.query('INSERT INTO employee SET ?', {
                            first_name: response.firstName,
                            last_name: response.lastName,
                            role_id: response.role,
                            manager_id: response.manager
                        },
                        (err, res) => {
                            if(err) throw err; 
                            console.log('')
                            console.log('Employee added!');
                            console.log('')
                            start();
                        });
                    });
                });
            }); 
        });
    };

// function to update an employee role 
const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, results) => {
        if(err) throw err; 

        inquirer.prompt([
            {
                name: 'employee',
                type: 'list', 
                message: 'Choose which employee you need to update',
                choices: function () {
                    const employeeArr = []; 
                    results.forEach(({ id, first_name, last_name }) => {
                        employeeArr.push({
                            name: first_name + ' ' + last_name,
                            value: id
                        });
                    });
                    return employeeArr; 
                }
            }
        ])
        .then( () => {
            db.query('SELECT * FROM role', (err, results) => {
                if(err) throw err; 

                inquirer.prompt([
                    {
                        name: 'role', 
                        type: 'list', 
                        message: 'Choose new role',
                        choices: function () {
                            const roleChoiceArr = []; 
                            results.forEach(({ title, id }) => {
                                roleChoiceArr.push({
                                    name: title, 
                                    value: id
                                });
                            });
                            return roleChoiceArr; 
                        }
                    }
                ])
                .then((response) => {
                    db.query('UPDATE employee SET ? WHERE ?', 
                    [
                        {
                            role_id: response.role
                        },
                        {
                            id: response.employee
                        }
                    ],
                    (err, res) => {
                        if(err) throw err; 
                        console.log(res)
                        console.log(`${res.affectedRows} Employee successfully updated!`);
                        console.log('')
                        start();
                    });
                });
            });
        }); 
    });
};


// call db connection & start app 
db.connect((err) => {
    if(err) throw err; 
    start(); 
});