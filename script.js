// Array of special characters to be included in password
var specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Array of uppercase characters to be included in password
var upperCasedCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  
  // Declare global variables here
  let arrayForPassword = []; // array to store password characters
  let noOfCharacters = 0;
  let passSpecial = false;
  let passNum = false;
  let passLow = false;
  let passCap = false;
  let selectedCharsNo = 0;
  let userInput = " ";
  let thePassword = ""; // to store password random characters
  
  
  function checkForSpace(str) {
    return str.indexOf(" ") >= 0; // Check and validate for spaces in password characters
  }
  
  // Function to prompt user for password options
  function getPasswordOptions() {
    while (noOfCharacters < 10 || noOfCharacters > 64 || !Number.isInteger(noOfCharacters) || checkForSpace(userInput)) {
      userInput = prompt("Set the length of your password. Your password length MUST be between 10 and 64."); 

      noOfCharacters =parseFloat(userInput);
      console.log("Password length is: " + Number.isInteger(noOfCharacters)); 
     
      if (checkForSpace(userInput)){
        alert("Spaces are NOT allowed. Please remove any spaces and try again.")
      } else if (!Number.isInteger(noOfCharacters)) {
        alert("Your input is not a number. Please try again")
      } else if((noOfCharacters < 10) || (noOfCharacters > 64)) {
        alert("Your password length MUST be between 10 and 64 characters. Try again.")
      } else {
        alert("You have specified " + noOfCharacters + " characters in your password.")
      }
    }
    console.log("There are " + noOfCharacters + " characters in the password");
  
    alert("Confirm the character types you want to include in your password.")
    while(!passSpecial && !passNum && !passLow && !passCap) {
      passSpecial = confirm("Include special characters in your password?");
      passNum = confirm("Include numeric characters in your password?");
      passLow = confirm("Include lowercase characters in your password?");
      passCap = confirm("Include uppercase characters in your password?");
      
      if(!passSpecial && !passNum && !passLow && !passCap) {
        alert("You did not select a valid chracter type. Please select at least one character type.")
      }
    }
  
    // Get the number of specified characters to be included
    if(passSpecial) {
        selectedCharsNo++;
        console.log("The password has special characters.");
    };
    if(passNum){
        selectedCharsNo++;
        console.log("The password has numeric characters.");
    };
    if(passLow){
      selectedCharsNo++;
      console.log("The password has lower case characters.");
    };
    if(passCap){
      selectedCharsNo++;
      console.log("The password has upper case characters.");
    };
    }
  
  // Function for getting a random element from an array
  function getRandom(arr) {
    let randomNum = Math.floor(Math.random()*arr.length);
    return arr[randomNum];
  }
  
  // Combine user-selected characters
  function getSelectedCharacter() {
    if(passLow){
      arrayForPassword =arrayForPassword.concat(lowerCasedCharacters);
    }
    if(passCap){
      arrayForPassword = arrayForPassword.concat(upperCasedCharacters);
    }
    if(passNum){
      arrayForPassword = arrayForPassword.concat(numericCharacters);
    }
    if(passSpecial){
      arrayForPassword = arrayForPassword.concat(specialCharacters);
    }
    
  }
  
  // Randomise the password string
  function makeRandom(passString) {
    let passArray = passString.split("");
    for (let x = passArray.length - 1; x > 0; x --) {
      let y = Math.floor(Math.random() * (x + 1));
      let z = passArray[x];
      passArray[x] = passArray[y];
      passArray[y] = z;
    }
    return passArray.join("");
  }
  
   // Function to generate password with user input
  function generatePassword() {
    getPasswordOptions();
    getSelectedCharacter();
   
    if (passSpecial) {
        thePassword += getRandom(specialCharacters);
      }
      if (passNum) {
        thePassword += getRandom(numericCharacters);
      }

    if (passLow) {
    thePassword += getRandom(lowerCasedCharacters);
    }
    if (passCap) {
    thePassword += getRandom(upperCasedCharacters);
    }
    for (let x = 0; x < noOfCharacters - selectedCharsNo; x++) {
    thePassword += getRandom(arrayForPassword);
    }
  
    thePassword = makeRandom(thePassword);
  
    return thePassword;
    }

    // Reset all values
  function valuesReset() {
    noOfCharacters = 0;
    passLow = false;
    passCap = false;
    passNum = false;
    passSpecial = false;
    selectedCharsNo = 0;
    arrayForPassword = [];
    thePassword ="";
  }
  
  // Get references to the #generate element
  var generateBtn = document.querySelector('#generate');
  
  // Write password to the #password input
  function writePassword() {
    valuesReset(); // reset the values before generate a new password
  
    var password = generatePassword();
    var passwordText = document.querySelector('#password');
    passwordText.value = password;
  }
  
  // Add event listener to generate button
  generateBtn.addEventListener('click', writePassword);