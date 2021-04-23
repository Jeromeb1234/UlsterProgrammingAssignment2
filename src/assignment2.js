//import modules needed for functions
var readlineSync = require('readline-sync'); //used to get user input
var fs = require('fs'); //used to write to and read txt file

//create array to store student object in
var studentArray = [];

//constructor function to create student object
function students(name, dateOfBirth, address, modulesTaken) {
    this.name = name,
    this.dateOfBirth = dateOfBirth,
    this.address = address,
    this.modulesTaken = modulesTaken
}//end of function

console.log('\n' + 'Welcome to the course - Financial Technology')

//start of main function - menu system
function main() {
    console.log('\n' + 'Please choose from the following options:')
    console.log('To add or remove a student, press 1')
    console.log('To display course details, press 2')
    console.log('To search for a student, press 3')
    console.log('To exit the program, press 4')

    var menuChoice = Number(readlineSync.question('\n' + 'What would you like to do? Please press corresponding number: '))

    //if-else statement to sort user input and call the correct function - includes validation if option from menu is not selected
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
}//end of main function

//function to add or remove a student from the array
function addOrRemove() {
    console.log('\n' + 'To add a student, press 1 - To remove a student, press 2')

    var menuChoice = Number(readlineSync.question('\n' + 'What would you like to do? Please press corresponding number: '))

    //if-else statement to sort user input and call the correct function - includes validation if option from choices is not selected
    if (menuChoice === 1) {
        addStudent();
    } else if (menuChoice === 2) {
        removeStudent();
    } else {
        console.log('\n' + 'Incorrect selection. Please try again.')
        addOrRemove();
    }
}//end of function

//function to add a student to the array
function addStudent() {
    var addAnother;

    do {
        //validation on the array to ensure only 20 students max can be added - > 19 is used as arrays start at 0, meaning this would be 20 students
        if (studentArray.length > 19) {
            console.log('\n' + 'This course has reached the maximum number of 20 students.');
            setTimeout (main, 1500);
            break;
        } else {
            console.log('\n' + 'Please provide the following information:');
            var name = validateName();
            var dateOfBirth = validateDateOfBirth();
            var address = validateAddress();
            var modulesTaken = validateModules();

            //create a new student object based on the inputs from the user
            var student = new students(name, dateOfBirth, address, modulesTaken);
            console.log('\n' + 'Student Successfully Added.')

            //push the student object to the students array
            studentArray.push(student);
        }

            //do-while loop to provide the user the choice of adding another student
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
}//end of function

//function to validate the input for student name - ensuring it can't be blank
function validateName() {
    var valid = false;
    do {
        var name = readlineSync.question('\n' + 'Name: ');

        if (name === '') {
            valid = true;
            console.log('\n' + 'Input cannot be blank. Please try again.');
        } else {
            valid = false;
        }
    } while (valid);

    name = name.toLowerCase();

    return name;
}//end of function

//function to validate the input for student date of birth - ensuring it can't be blank
function validateDateOfBirth() {
    var valid = false;
    do {
        var dateOfBirth = readlineSync.question('\n' + 'Date of Birth (dd/mm/yyyy): ');

        if (dateOfBirth === '') {
            valid = true;
            console.log('\n' + 'Input cannot be blank. Please try again.');
        } else {
            valid = false;
        }
    } while (valid);

    return dateOfBirth;
}//end of function

//function to validate the input for student address - ensuring it can't be blank
function validateAddress() {
    var valid = false;
    do {
        var address = readlineSync.question('\n' + 'Address: ');

        if (address === '') {
            valid = true;
            console.log('\n' + 'Input cannot be blank. Please try again.');
        } else {
            valid = false;
        }
    } while (valid);

    return address;
}//end of function

//function to validate the input for number of modules taken - ensuring it can't be > 4, ensuring it can't be 0 or less and ensuring input is a number
function validateModules() {
    var valid = false;
    do {
        var modulesTaken = Number(readlineSync.question('\n' + 'Number of Modules you are taking (4 max): '));

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
}//end of function

//function to remove a student from the array
function removeStudent() {
    var removeAnother;

    //validation to check that there are students in the array to remove
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

            //do-while loop to provide user the option to remove another student
            do {
                console.log('\n' + 'Student Removed!')
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
}//end of function

//function to print the students name and ID - starting from ID: 1 - to allow user to easily remove the right student
function printStudents() {
    studentID = 0;
    for (var i = 0; i < studentArray.length; i++) {
        studentID = studentID + 1;
        console.log('Student Name: ' + studentArray[i].name + ' - Student ID: ' + studentID);
    }
}//end of function

//function to display the course details
function displayCourseDetails() {
    console.log('\n' + 'Course Name: Financial Technology')
    console.log('Course Directors Name: Claire McCann')
    console.log('Total number of students: ' + studentArray.length)
    studentModulePercentages()
    returnToMain();
}//end of function

//function to calculate the percentage of students taking each module
function studentModulePercentages() {
    //validation to check there are currently students in the array
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
}//end of function

//function to search for a student by name and display their details
function searchForStudent() {
    var searchAgain;

    //validation to check there are currently students in the array
    if (studentArray.length === 0) {
        console.log('\n' + 'No students are currently enrolled for this course.')
        setTimeout (main, 1500);
    } else {
        do {
            do {
                var found = false;
                var searchedStudent = readlineSync.question('\n' + 'Enter the students name you want to search for: ');
                searchedStudent = searchedStudent.toLowerCase();
                
                //search the array for the name of the student that the user wants to search for and display details if found
                for (var i = 0; i < studentArray.length; i++) {
                    if (searchedStudent === studentArray[i].name) {
                        found = true;
                        console.log('\n' + 'Student Found!')
                        console.log('Name: ' + studentArray[i].name + '\n' + 'Date of Birth: ' + studentArray[i].dateOfBirth + 
                        '\n' + 'Address: ' + studentArray[i].address + '\n' + 'Number of modules taken: ' + studentArray[i].modulesTaken);
                        break;
                    }
                }
                //if not found, display this message
                if (!found) {
                    console.log('\n' + 'Student not found, please try again.')
                }
            } while (!found);
    
            //do-while loop to provide user the option to search for another student
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
}//end of function

//function to return to the main menu
function returnToMain() {
    var mainMenu;

    //do-while loop to see if the user wants to return to the menu and validate input
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
}//end of function

//function to write the student details from the array to a txt file
function writeToFile() {
    //calculate the percentage again to write to file - duplicate code as we couldn't get it working any other way
    oneModule = studentArray.filter(x => x.modulesTaken === 1).length;
    twoModules = studentArray.filter(x => x.modulesTaken === 2).length;
    threeModules = studentArray.filter(x => x.modulesTaken === 3).length;
    fourModules = studentArray.filter(x => x.modulesTaken === 4).length;

    oneModulePercentage = (oneModule/studentArray.length) * 100 + '%';
    twoModulesPercentage = (twoModules/studentArray.length) * 100 + '%';
    threeModulesPercentage = (threeModules/studentArray.length) * 100 + '%';
    fourModulesPercentage = (fourModules/studentArray.length) * 100 + '%';

    //for loop to search through each element of the array and format how the student details data will be written to txt file
    let studentFile = '';
    for (var i = 0; i < studentArray.length; i++) {
        
        let studentFileEntry =
            studentArray[i].name +
            ',' +
            studentArray[i].dateOfBirth +
            ',' +
            studentArray[i].address +
            ',' +
            studentArray[i].modulesTaken.toString() +
            '\n';
        studentFile += studentFileEntry;
    }

    //format how the course details data will be written to txt file
    let courseFile = 'Course Name: Financial Technology' +
                     '\n' +
                     'Course Directors Name: Claire McCann' +
                     '\n' +
                     'Total number of students: ' + studentArray.length +
                     '\n' +
                     'Percentage of students taking one module: ' + oneModulePercentage +
                     '\n' +
                     'Percentage of students taking two modules: ' + twoModulesPercentage +
                     '\n' +
                     'Percentage of students taking three modules: ' + threeModulesPercentage +
                     '\n' +
                     'Percentage of students taking four modules: ' + fourModulesPercentage

    //fs function to write the student data to txt file
    fs.writeFile (
        'StudentDetails.txt',
        studentFile.trim(),
        function (err) {
            if (err) console.log(err);
            else console.log('\n' + 'Student write operation complete.');
        }
    );

    //fs function to write the course data to txt file
    fs.writeFile (
        'CourseDetails.txt',
        courseFile,
        function (err) {
            if (err) console.log(err);
            else console.log('Course write operation complete.');
        }
    );
}//end of function

//function to read student data from txt file and store it in the array again
function readFile() {

    //check to see if the file exists
    if (fs.existsSync('./StudentDetails.txt')) {
        console.log('\n' + 'File found, running program.');

        try { 
            var data = fs.readFileSync('./StudentDetails.txt', 'utf8');
        } catch(e) { 
            console.log('Error:', e.stack);
        }
    
        var lines = data.split('\n')
        for (line = 0; line < lines.length; line++) {
            currentLine = lines[line];
            lineContent = currentLine.split(',')

            studentObject = new students;
            studentObject.name = lineContent[0];
            studentObject.dateOfBirth = lineContent[1];
            studentObject.address = lineContent [2];
            studentObject.modulesTaken = parseInt(lineContent[3]);
            studentArray.push(studentObject);
        }
    } else {
        console.log('\n' + 'File not found, running program.');
    };
}//end of function

//calling the read file function
readFile();

//calling the main function
main();