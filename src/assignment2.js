var readlineSync = require('readline-sync');
var studentArray = [];

function students(name, dateOfBirth, address, modulesTaken) {
    this.name = name,
    this.dateOfBirth = dateOfBirth,
    this.address = address,
    this.modulesTaken = modulesTaken
}

console.log("\n" + "Welcome to the course - Financial Technology")

function main() {
    console.log("\n" + "Please choose from the following options:")
    console.log("To add or remove a student, press 1")
    console.log("To display course details, press 2")
    console.log("To search for a student, press 3")
    console.log("To exit the program, press 4")

    var menuChoice = Number(readlineSync.question("\n" + "What would you like to do? Please press corresponding number: "))

    if (menuChoice === 1) {
        addOrRemove();
    } else if (menuChoice === 2) {
        displayCourseDetails();
    } else if (menuChoice === 3) {
        searchForStudent();
    } else if (menuChoice === 4) {
        console.log("Exit the program");
    } else {
        console.log("\n" + "Incorrect selection. Please try again.")
        main();
    }
}

function addOrRemove() {
    console.log("\n" + "To add a student, press 1 - To remove a student, press 2")

    var menuChoice = Number(readlineSync.question("\n" + "What would you like to do? Please press corresponding number: "))

    if (menuChoice === 1) {
        addStudent();
    } else if (menuChoice === 2) {
        removeStudent();
    } else {
        console.log("\n" + "Incorrect selection. Please try again.")
        addOrRemove();
    }
}

function addStudent() {
    var addAnother;
    do {
        console.log("\n" + "Please provide the following information:");
        var name = readlineSync.question("Name: ");
        var dateOfBirth = readlineSync.question("Date of Birth (dd/mm/yyyy): ");
        var address = readlineSync.question("Address: ");
        var modulesTaken = validateModules();

        var student = new students(name, dateOfBirth, address, modulesTaken);
        console.log("\n" + "Student Successfully Added.")
        studentArray.push(student);

        do {
            addAnother = readlineSync.question("Do you want to add another student? (y/n): ")
            var valid = ((addAnother === 'y') || (addAnother === 'Y') || (addAnother === 'n') || (addAnother === 'N'));

            if (!valid) {
                console.log("Incorrect selection. Please try again");
            }
        } while (!valid);
    } while ((addAnother === 'y') || (addAnother === 'Y'));
}

function removeStudent() {
    console.log("Function to remove a student");
}

function validateModules() {
    var valid = false;
    do {
        var modulesTaken = Number(readlineSync.question("Number of Modules you are taking (4 max): "));

        if (modulesTaken > 4) {
            valid = true;
            console.log("\n" + "The max number of modules that can be taken is 4. Please try again.");
        } else {
            valid = false;
        }
    } while (valid);

    return modulesTaken;
}

function displayCourseDetails() {
    console.log("Function to display course details");
}

function searchForStudent() {
    console.log("Function to search for student");
}

main();