const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

function createTeam() {

    function newEmployee() {
        inquirer.prompt([
            {
                type: "list",
                message: "What type of employee would you like to add to your team?",
                name: "employeeType",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more employees"
                ]          
            },   
        ]).then(answer => {
            const { employeeType } = answer;
            if(employeeType === "Manager") {
                addManager();
            } else if(employeeType === "Engineer") {
                addEngineer();
            } else if(employeeType === "Intern") {
                addIntern();
            } else {
                renderTeam();
            }
        });
    }

    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this manager's name?",
                name: "name"          
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is their office number?",
                name: "officeNumber"
            }   
        ]).then(answers => {
            const { name, id, email, officeNumber } = answers;
            const manager = new Manager(name, id, email, officeNumber);
            team.push(manager);
            newEmployee();
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this engineer's name?",
                name: "name"          
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is their GitHub username?",
                name: "github"
            }   
        ]).then(answers => {
            const { name, id, email, github } = answers;
            const engineer = new Engineer(name, id, email, github);
            team.push(engineer);
            newEmployee();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is this intern's name?",
                name: "name"          
            },
            {
                type: "input",
                message: "What is their employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is their email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is their school?",
                name: "school"
            }   
        ]).then(answers => {
            const { name, id, email, school } = answers;
            const intern = new Intern(name, id, email, school);
            team.push(intern);
            newEmployee();
        });
    }

    function renderTeam() {
        fs.writeFile(outputPath, render(team), (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("✔️ " + " Successfully created team profile page!")
            }
        });
    }
    newEmployee();
}

createTeam();