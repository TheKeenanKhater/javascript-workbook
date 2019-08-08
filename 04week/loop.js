'use strict'

//declares starting number as variable
let x=1;
//prints numbers 1-1000
do{
    console.log(x);
    x ++;
} 
while(x<=1000);

//object declarations
const person1 = {
  firstName: "Jane",
  lastName: "Doe",
  birthDate: "Jan 5, 1925",
  gender: "female",
};
const person2 = {
  firstName: "John",
  lastName: "Doe",
  birthDate: "Feb 16, 1930",
  gender: "male",
};
const person3 = {
  firstName: "Joe",
  lastName: "Doe",
  birthDate: "Nov 11, 1947",
  gender: "male",
};
const person4 = {
  firstName: "Jack",
  lastName: "Doe",
  birthDate: "Feb 11, 1992",
  gender: "male",
};
const person5 = {
  firstName: "Jill",
  lastName: "Doe",
  birthDate: "May 2, 1975",
  gender: "female",
};

//declaration of array of objects
let arrayOfPersons = [person1, person2, person3, person4, person5];

//function to log only odd birth years
function oddBirthYear(person){
  //loops through keys in object
  for(let x in person){
    //locates birthDate key
    if (x == 'birthDate'){
      //splits array to get last digit in birth year
      let bdArray = person[x].split('');
      let oddYear = bdArray[bdArray.length-1];
      oddYear = Number(oddYear);
      if (oddYear%2 == 1){
        //if last digit is odd print the birthDate
        console.log("ODD BIRTH YEAR: " + person[x]);
      };
    };
  };
};

//logs birthdates of persons with odd birth years
arrayOfPersons.map(person => {
  oddBirthYear(person);
});

//logs information from persons array
console.log("PERSONS INFORMATION:");
arrayOfPersons.map(person => {
  for (let x in person){
    console.log(person[x]);
  }
});

//creates new array of only male persons
const filteredMales = arrayOfPersons.filter(person => person.gender == 'male');
//logs array of male persons
console.log("ARRAY OF MALES:");
console.log(filteredMales); 

//creates new array of persons born before 1990
const filteredAge = arrayOfPersons.filter(function(person){
  for(let x in person){
      if(x == 'birthDate'){
        let array = person[x].split(' ');
        let year = array[array.length-1];
        return year < 1990;
      };
   };
});
//logs array of persons born before 1990     
console.log("BORN BEFORE 1990:");                                     
console.log(filteredAge)