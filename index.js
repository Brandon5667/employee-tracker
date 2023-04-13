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
    .createPromptModule([
        {
            type: 'rawlist',
            message: 'Please Make A Selection:',
            name: 'view',
            choices: ['View All Departments', 'View All Roles', 'View All Employees']
        }
    ])
    .then((answers)=>{

    })