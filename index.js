import mysql from 'mysql2';
import inquirer from 'inquirer';
import { query } from 'express';

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employees_db',
    password: 'Aerius<3!',
});

function menu() {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;

            case 'View all roles':
                viewAllRoles();
                break;

            case 'View all employees':
                viewAllEmployees();
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

            case 'Exit':
                db.end();
                console.log('Goodbye!');
            
            default:
                console.log('Invalid choice');
                break;
        }
    });
}

function viewAllDepartments() {
    const query = 'SELECT * FROM departments';
    db.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        menu();
    });
}

function viewAllRoles() {
    const query = 'SELECT * FROM roles';
    db.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        menu();
    });
}


function viewAllEmployees() {
    const query = 'SELECT * FROM employees';
    db.query(query, function (err, results) {
        if (err) throw err;
        console.table(results);
        menu();
    });
}
    

    function addDepartment() {
        inquirer
            .prompt({
                name: 'name',
                type: 'input',
                message: 'Enter the name of the new department:',            
            })
            .then((answer) => {
                const query = `INSERT INTO departments (name) VALUES (?)`;
                const values = [answer.name];

                db.query(query, values, function (err, results) {
                    if (err) {
                        console.error('Error adding department:', err);
                    } else {
                        console.log(`New department '${answer.name}' added successfully.`);
                    }
                    menu();
                });
            });
    }

    function addRole() {
        inquirer
            .prompt([
                {
                    name: 'Roles',
                    type: 'input',
                    message: 'Enter the title of the new role:',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Enter the salary for the new role:',
                    validate: (input) => {
                        return !isNaN(input) && input > 0;
                    },
                },
                {
                    name: 'roleList',
                    type: 'list',
                    message: 'Department of Role?',
                    choices: [
                        'Sales Manager',
                        'Sales Rep',
                        'Marketing Manager',
                        'Marketing Specialist',
                        'Software Engineer',
                        'Web Developer',
                        'Financial Analyst',
                        'Accountant', 
                    ]


                },
            ])

            .then((answers) => {
                const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
                const values = [answers.title, parseFloat(answers.salary), parseInt(answers.department_id)];

                db.query(query, values, (err, results) => {
                    if (err) {
                        console.error('Error adding role:', err);
                    } else {
                        console.log(`New role '${answers.title}' added succesfully.`);
                    }

                    menu();
                });
            });
        }

    function addEmployee() {
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'Enter the first name of your new employee:',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'Enter the last name of your new employee:',
                },
                {
                    name: 'role_id',
                    type: 'input',
                    message: 'Enter the role ID for your new employee:',
                    validate: (input) => {
                        return !isNaN(input) && input > 0 && Number.isInteger(parseFloat(input));
                    },
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: 'Enter the manager ID of your new employee:',
                    default: null,
                    validate: (input) => {
                        return input === null || (!isNaN(input) && input > 0 && Number.isInteger(parseFloat(input)));
                    },
                },
            ])
            .then((answers) => {
                const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                const values = [
                    answers.first_name,
                    answers.last_name,
                    parseInt(answers.role_id),
                    answers.manager_id != null ? parseInt(answers.manager_id) : null,
                ];

                db.query(query, values, (err, results) => {
                    if (err) {
                        console.error('Error adding employee:', err);
                    } else {
                        console.log(
                            `New employee '${answers.first_name} ${answers.last_name}' added successfully.`
                        );
                    }

                    menu();
                });
            });
    }

    function updateEmployeeRole() {
        const employeeQuery = 'SELECT id, first_name, last_name FROM employees';
        const roleQuery = 'SELECT id, title FROM roles';

        inquirer
        .prompt([
            {
                name: 'employeeId',
                type: 'list',
                message: 'Select the employee to update their role:',
                choices: function () {
                    return new Promise((resolve, reject) => {
                        db.query(employeeQuery, (err, results) => {
                            if (err) {
                                reject(err);
                                return;
                            }

                            const choices = results.map((employee) => ({
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id,
                            }));
                            resolve(choices);
                        });
                    });
                },
            },
        {
            name: 'roleId',
            type: 'list',
            message: 'Select the new role for the employee:',
            choices: function () {
                return new Promise((resolve, reject) => {
                    db.query(roleQuery, (err, results) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        const choices = results.map((role) => ({
                            name: role.title,
                            value: role.id,
                        }));
                        resolve(choices);
                    });
                });
            },
        },
        ])
        .then((answers) => {
            const updateQuery = 'UPDATE employees SET role_id = ? WHERE id = ?';
            const values = [answers.roleId, answers.employeeId];

            db.query(updateQuery, values, (err, result) => {
                if (err) {
                    console.error('Error updating employee role:', err);
                } else {
                    console.log('Employee role updated successfully.');
                }

                menu();
            });
        });
        };

menu();