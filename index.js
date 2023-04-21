const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { type } = require('os');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '12345',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );
  

inquirer
    .prompt([
        {
            type: 'rawlist',
            message: 'Please Make A Selection:',
            name: 'view',
            choices: ['View All Departments', 'View All Roles', 'View All Employees',]
        }
    ])
    .then((answers)=>{
      switch(answers.choices) {
        case 'View All Departments':
          db.query('SELECT * FROM department');
          break;
        case 'View All Roles':
          db.query('SELECT * FROM roles');
          break;
        case 'View All Employees':
          db.query('SELECT * FROM employees');
          break;
      }
    });