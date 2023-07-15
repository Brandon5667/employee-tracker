const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const startPromt = () => {
  inquirer
    .prompt([
      {
        type: 'rawlist',
        message: 'Please Make A Selection:',
        name: 'view',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Employee', 'Add Role', 'Update Employee Role']
      }
    ])
    .then((answers) => {
      switch (answers.view) {
        case 'View All Departments':
          viewAllDepartments();
          break;
        case 'View All Roles':
          viewAllRoles();
          break;
        case 'View All Employees':
          viewAllEmployees();
          break;
        case 'Add Department':
          addDepertment();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add Role':
          addRole();
          break;
        case 'Update Employee Role':
          updateEmployeeRole();
          break;

      }
    });
};

function viewAllDepartments() {
  db.query('SELECT * FROM department', (error, results) => {
    if (error) {
      console.log(error);
    };
    console.table(results);
    startPromt();
  });

};

function viewAllEmployees() {
  db.query('SELECT * FROM employee', (error, results) => {
    if (error) {
      console.log(error);
    };
    console.table(results);
    startPromt();
  });

};

function viewAllRoles() {
  db.query('SELECT * FROM role', (error, results) => {
    if (error) {
      console.log(error);
    };
    console.table(results);
    startPromt();
  });

};

function addDepertment() {
  const addDeparmentPromt = () => {
    inquirer
      .prompt([
        {
          name: 'department',
          type: "input",
          message: 'Enter the departrment name.',
        }
      ])
      .then((answer) => {
        db.query(`INSERT INTO department (name) VALUES ('${answer.department}')`, (error, results) => {
          if (error) {
            console.log(error);
          };
          console.table(results);
          startPromt();
        }
        )
      })
  }
  addDeparmentPromt();
};

function addEmployee() {
  const addEmployeePromt = () => {
    inquirer
      .prompt([
        {
          name: 'first',
          type: "input",
          message: 'Enter the employee first name.',
        },
        {
          name: 'last',
          type: "input",
          message: 'Enter the employee last name.',
        },
        {
          name: 'role',
          type: "input",
          message: 'Enter the employee role.',
        },
        {
          name: 'manager',
          type: "input",
          message: 'Enter the employee manager.',
        }
      ])
      .then((answer) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES ('${answer.first}', '${answer.last}', '${answer.role}', '${answer.manager}')`, (error, results) => {
          if (error) {
            console.log(error);
          };
          console.table(results);
          startPromt();
        }
        )
      })
  }
  addEmployeePromt();
};

function addRole() {
  const addRolePromt = () => {
    inquirer
      .prompt([
        {
          name: 'title',
          type: "input",
          message: 'Enter the role title.',
        },
        {
          name: 'salary',
          type: "input",
          message: 'Enter the role salary.',
        },
        {
          name: 'depertment_id',
          type: "input",
          message: 'Enter the department id.',
        },

      ])
      .then((answer) => {
        db.query(`INSERT INTO role (title, salary, department_id)
         VALUES ('${answer.title}', '${answer.salary}', '${answer.depertment_id}')`, (error, results) => {
          if (error) {
            console.log(error);
          };
          console.table(results);
          startPromt();
        }
        )
      })
  }
  addRolePromt();
};

function updateEmployeeRole() {
  db.query('SELECT * FROM employee', (error, result) => {
    if (error) {
      console.log(error);
    };
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",
          message: "Of which employee do you want to change the role?",
          choices: function () {
            var employeeArray = [];
            result.forEach(result => {
              employeeArray.push(
                result.last_name
              );
            })
            return employeeArray;
          }
        }
      ])


      .then((answer) => {
        const name = answer.employeeName;
        db.query("SELECT * FROM role", (error, result) => {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  var roleArray = [];
                  result.forEach(result => {
                    roleArray.push(
                      result.title)
                  })
                  return roleArray;
                }
              }
            ])

            .then((roleAnswer) => {
              const role = roleAnswer.role;
              db.query(`SELECT * FROM role WHERE title = ?`, [role], (error, result) => {
                if (error) {
                  console.log(error);
                };
                let roleId = result[0].id;
                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                let values = [parseInt(roleId), name]
                db.query(query, values,
                  function (error, result, fields) {
                    console.log(`You have updated ${name}'s role to ${role}.`)
                  })
                viewAllEmployees();
                startPromt();
              })
            })




        });

      }
      )
  }
  )
}



startPromt();