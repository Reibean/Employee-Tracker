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
                break;
            case 'View all roles':
                break;
            case 'View all employees':
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

menu();