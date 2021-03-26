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
    console.log("Function to add a student");
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
    if ((addAnother === 'n') || (addAnother === 'N')) {

        main();

    }
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

function printStudents(student) {
    for(i = 0; i < students.length; i++){
        id = [i] + 1;
        console.log(student[i] + " Student number " + id + "\n");
    }
}

function removeStudent() {
    console.log("Function to remove a student");
    console.log("Here is a list of current students: " + printStudents())
    var studentNumber = Number(readlineSync.question("\n" + "Which student would you like to remove?: "));
    var spliceNumber = studentNumber -1;
    studentArray.splice(spliceNumber, 1);
    return studentArr;
}

function displayCourseDetails() {
    console.log("Function to display course details");
    console.log("Course Name: Financial Technology")
    console.log("Course Directors Name: Claire McCann")
    console.log("Total number of students: " + studentArray.length)
    studentModulePercentages()
}

function studentModulePercentages(){
    oneModule = studentArray.filter(x => x.modulesTaken === 1).length;
    twoModules = studentArray.filter(x => x.modulesTaken === 2).length;
    threeModules = studentArray.filter(x => x.modulesTaken === 3).length;
    fourModules = studentArray.filter(x => x.modulesTaken === 4).length;

    oneModulePercentage = (oneModule/studentArray.length)*100 + "%";
    twoModulesPercentage = (oneModule/studentArray.length)*100 + "%";
    threeModulesPercentage = (oneModule/studentArray.length)*100 + "%";
    fourModulesPercentage = (oneModule/studentArray.length)*100 + "%";
    console.log("Percentage of students taking one module: " + oneModulePercentage)
    console.log("Percentage of students taking two modules: " + twoModulesPercentage)
    console.log("Percentage of students taking three modules: " + threeModulesPercentage)
    console.log("Percentage of students taking four modulea: " + fourModulesPercentage)
}

function searchForStudent() {
    console.log("Function to search for student");
    var searchedStudent = readlineSync.question("Enter the students name you want to search for: ")
    for(i= 0; i < studentArray.length; i++){
        if(searchedStudent === studentArray[i].name){
            console.log("This is the details of the student you searched for" + studentArray[i].name + studentArray[i].address + studentArray[i].dateOfBirth + studentArray[i].modulesTaken);
        }
    }
}

main();