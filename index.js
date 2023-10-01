const inquirer = require('inquirer');
const db = require('./db');

function menu() {
    inquirer
    .createPromptModule({
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
                break;

            case 'Add a role':
                break;

            case 'Add an employee':
                break;

            case 'Update an employee role':
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

menu();