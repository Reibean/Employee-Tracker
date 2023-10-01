import inquirer from "inquirer";
import mysql from "mysql2";
import fs from "fs";

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Aerius<3!',
    database: 'employees_db',
});

fs.readFile('db/schema.sql', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading schema.sql:', err);
        process.exit(1);
    }

db.connect((err) => {
    if (err) {
        console.error('Error conneccting to MySQL:', err);
        process.exit(1);
    } 

    db.query(data, (err, results) => {
        if (err) {
            console.error('Error executing schema.sql:', err);
            process.exit(1);
        }

        console.log('Database and tables created.');

        db.end();
        console.log('Connected to MySQL database');
        });
    });
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
            'Exit',
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
                process.exit(0);
            
            default:
                console.log('Invalid choice');
                break;
        }
    });
}

function viewAllDepartments() {
    const query = 'SELECT * FROM departments';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving departments:', err);
            return;
        }
        console.log('All Departments:');
        for (const department of results) {
            console.log('ID: ${department.id | Name:${department.name}');
        }

        menu();
    })
}

function viewAllRoles() {
    const query = 'SELECT * FROM roles';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving roles:', err);
            return;
        }
        console.log('All Roles:');
        for (const roles of results) {
            console.log('ID: ${role.id | Name:${role.name}');
        }

        menu();
        })
    }

    function viewAllEmployees() {
        const query = 'SELECT * FROM employees';
    
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error retrieving employees:', err);
                return;
            }
            console.log('All Employees:');
            for (const roles of results) {
                console.log('ID: ${employee.id | Name:${employee.name}');
            }
    
            menu();
            })
        }

    function addDepartment() {
        inquirer
            .createPromptModule({
                name: 'name',
                type: 'input',
                message: 'Enter the name of the new department:',            
            })
            .then((answer) => {
                const query = 'INSERT INTO departments (name) VALUES (?)';
                const values = [answer.name];

                db.query(query, values, (err, results) => {
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
                    name: 'title',
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
                    name: 'department_id',
                    type: 'input',
                    message: 'Enter the department ID for the new role:',
                    validate: (input) => {
                        return !isNaN(input) && input > 0 && Number.isInteger(parseFloat(input)); 
                    },
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

    }

menu();