var readlineSync = require('readline-sync');
var studentArray = [];

function students(name, dateOfBirth, address, modulesTaken) {
    this.name = name,
    this.dateOfBirth = dateOfBirth,
    this.address = address,
    this.modulesTaken = modulesTaken
}

console.log('\n' + 'Welcome to the course - Financial Technology')

function main() {
    console.log('\n' + 'Please choose from the following options:')
    console.log('To add or remove a student, press 1')
    console.log('To display course details, press 2')
    console.log('To search for a student, press 3')
    console.log('To exit the program, press 4')

    var menuChoice = Number(readlineSync.question('\n' + 'What would you like to do? Please press corresponding number: '))

    if (menuChoice === 1) {
        addOrRemove();
    } else if (menuChoice === 2) {
        displayCourseDetails();
    } else if (menuChoice === 3) {
        searchForStudent();
    } else if (menuChoice === 4) {
        writeToFile();
    } else {
        console.log('\n' + 'Incorrect selection. Please try again.')
        main();
    }
}

function addOrRemove() {
    console.log('\n' + 'To add a student, press 1 - To remove a student, press 2')

    var menuChoice = Number(readlineSync.question('\n' + 'What would you like to do? Please press corresponding number: '))

    if (menuChoice === 1) {
        addStudent();
    } else if (menuChoice === 2) {
        removeStudent();
    } else {
        console.log('\n' + 'Incorrect selection. Please try again.')
        addOrRemove();
    }
}

function addStudent() {
    var addAnother;
    do {
        if (studentArray.length > 19) {
            console.log('\n' + 'This course has reached the maximum number of 20 students.');
            setTimeout (main, 1500);
            break;
        } else {
            console.log('\n' + 'Please provide the following information:');
            var name = readlineSync.question('Name: ');
            var dateOfBirth = readlineSync.question('Date of Birth (dd/mm/yyyy): ');
            var address = readlineSync.question('Address: ');
            var modulesTaken = validateModules();

            var student = new students(name, dateOfBirth, address, modulesTaken);
            console.log('\n' + 'Student Successfully Added.')
            studentArray.push(student);
        }

            do {
                addAnother = readlineSync.question('\n' + 'Do you want to add another student? (y/n): ')
                var validInput = ((addAnother === 'y') || (addAnother === 'Y') || (addAnother === 'n') || (addAnother === 'N'));

                if (!validInput) {
                    console.log('Incorrect selection. Please try again.');
                }
            } while (!validInput);
    } while ((addAnother === 'y') || (addAnother === 'Y'));

    if ((addAnother === 'n') || (addAnother === 'N')) {
        main();
    }
}

function validateModules() {
    var valid = false;
    do {
        var modulesTaken = Number(readlineSync.question('Number of Modules you are taking (4 max): '));

        if (modulesTaken > 4) {
            valid = true;
            console.log('\n' + 'The max number of modules that can be taken is 4. Please try again.');
        } else if (isNaN(modulesTaken)) {
            valid = true;
            console.log('\n' + 'Input must be a number. Please try again.');
        } else if (modulesTaken === 0) {
            valid = true;
            console.log('\n' + 'Input must be greater than zero. Please try again.');
        } else {
            valid = false;
        }
    } while (valid);

    return modulesTaken;
}

function removeStudent() {
    var removeAnother;

    if (studentArray.length === 0) {
        console.log('\n' + 'No students are currently enrolled for this course.')
        setTimeout (main, 1500);
    } else {
        console.log('\n' + 'Currently enrolled students:')

        do {
            printStudents();
            console.log('\n' + 'To remove a student, please enter their associated student ID')
            var studentNumber = Number(readlineSync.question('Which student would you like to remove?: '));
            var spliceNumber = studentNumber -1;
            studentArray.splice(spliceNumber, 1);

            do {
                removeAnother = readlineSync.question('Do you want to remove another student? (y/n): ')
                var validInput = ((removeAnother === 'y') || (removeAnother === 'Y') || (removeAnother === 'n') || (removeAnother === 'N'));

                if (!validInput) {
                    console.log('Incorrect selection. Please try again.');
                }
            } while (!validInput);
        } while ((removeAnother === 'y') || (removeAnother === 'Y'));

        if ((removeAnother === 'n') || (removeAnother === 'N')) {
            main();
        }
    }
}

function printStudents() {
    studentID = 0;
    for (var i = 0; i < studentArray.length; i++) {
        studentID = studentID + 1;
        console.log('Student Name: ' + studentArray[i].name + ' - Student ID: ' + studentID);
    }
}

function displayCourseDetails() {
    console.log('\n' + 'Course Name: Financial Technology')
    console.log('Course Directors Name: Claire McCann')
    console.log('Total number of students: ' + studentArray.length)
    studentModulePercentages()
    returnToMain();
}

function studentModulePercentages() {
    if (studentArray.length === 0) {
        console.log('No students are currently enrolled for this course.')
    } else {
        oneModule = studentArray.filter(x => x.modulesTaken === 1).length;
        twoModules = studentArray.filter(x => x.modulesTaken === 2).length;
        threeModules = studentArray.filter(x => x.modulesTaken === 3).length;
        fourModules = studentArray.filter(x => x.modulesTaken === 4).length;

        oneModulePercentage = (oneModule/studentArray.length) * 100 + '%';
        twoModulesPercentage = (twoModules/studentArray.length) * 100 + '%';
        threeModulesPercentage = (threeModules/studentArray.length) * 100 + '%';
        fourModulesPercentage = (fourModules/studentArray.length) * 100 + '%';
        console.log('Percentage of students taking one module: ' + oneModulePercentage)
        console.log('Percentage of students taking two modules: ' + twoModulesPercentage)
        console.log('Percentage of students taking three modules: ' + threeModulesPercentage)
        console.log('Percentage of students taking four modules: ' + fourModulesPercentage)
    }
}

function searchForStudent() {
    var searchAgain;

    if (studentArray.length === 0) {
        console.log('\n' + 'No students are currently enrolled for this course.')
        setTimeout (main, 1500);
    } else {
        do {
            do {
                var found = false;
                var searchedStudent = readlineSync.question('\n' + 'Enter the students name you want to search for: ');
                
                for (var i = 0; i < studentArray.length; i++) {
                    if (searchedStudent === studentArray[i].name) {
                        found = true;
                        console.log('\n' + 'Student Found!')
                        console.log('Name: ' + studentArray[i].name + '\n' + 'Date of Birth: ' + studentArray[i].dateOfBirth + 
                        '\n' + 'Address: ' + studentArray[i].address + '\n' + 'Number of modules taken: ' + studentArray[i].modulesTaken);
                        break;
                    }
                }

                if (!found) {
                    console.log('\n' + 'Student not found, please try again.')
                }
            } while (!found);
    
            do {
                searchAgain = readlineSync.question('\n' + 'Do you want to search for another student? (y/n): ');
                var validInput = ((searchAgain === 'y') || (searchAgain === 'Y') || (searchAgain === 'n') || (searchAgain === 'N'));
    
                if (!validInput) {
                    console.log('Incorrect selection, please try again.');
                }
            } while (!validInput);
        } while ((searchAgain === 'y') || (searchAgain === 'Y'));
    
        if ((searchAgain === 'n') || (searchAgain === 'N')) {
            main();
        }
    }
}

function returnToMain() {
    var mainMenu;

    do {
        mainMenu = readlineSync.question('\n' + "To return to the main menu, press 'M': ");
        var validInput = ((mainMenu === 'm') || (mainMenu === 'M'));

        if (!validInput) {
            console.log('Incorrect selection. Please try again.');
        }
    } while (!validInput)

    if ((mainMenu === 'm') || (mainMenu === 'M')) {
        main();
    }
}

function writeToFile() {
    var fs = require('fs');

    let studentFile = '';
    for (var i = 0; i < studentArray.length; i++) {
        
        let studentFileEntry =
            studentArray[i].name +
            ', ' +
            studentArray[i].dateOfBirth +
            ', ' +
            studentArray[i].address +
            ', ' +
            studentArray[i].modulesTaken.toString() +
            '\n';
        studentFile += studentFileEntry;
    }

    let courseFile = 'Course Name: Financial Technology' +
                     '\n' +
                     'Course Directors Name: Claire McCann' +
                     '\n' +
                     'Total number of students: ' + studentArray.length
                     '\n' +
                     

    fs.writeFile (
        'StudentDetails.txt',
        studentFile,
        function (err) {
            if (err) console.log(err);
            else console.log('\n' + 'Student write operation complete.');
        }
    );

    fs.writeFile (
        'CourseDetails.txt',
        courseFile,
        function (err) {
            if (err) console.log(err);
            else console.log('Course write operation complete.');
        }
    );
}

main();