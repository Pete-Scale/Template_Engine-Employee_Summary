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
                message: "As manager, what is your name?",
                name: "name"          
            },
            {
                type: "input",
                message: "What is your employee ID?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email" 
            },
            {
                type: "input",
                message: "What is your office number?",
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
}

createTeam();

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.