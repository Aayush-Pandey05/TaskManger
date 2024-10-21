const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema will define the structure of the data that we are going to store
//Here Schema is a CONSTRUCTOR function

const taskSchema = new Schema({ // this will define the structure of our database 
    title:{
        type: String,
        required: true
    },
    taskday:{
        type: String,
        required: true // this means entering the value is required
    },
    body:{
        type: String,
        required: true
    }
},{ timestamps: true });// here new Schema will create new insttance(object) of Schema and we are passing an object inside it
// this object will auto assign the values for us when we arew updating the tasks... we will get more clarity once we do so


const Task = mongoose.model('Task', taskSchema);// we are creating a model based on the schema we defined earlier and this method will look for the tasks section in mongodb and automatically provide us with different dunction sto access them 
// we always give the singular name of the database in the model method because it will plurify the word itself and look for the databse in mongodb

module.exports = Task; // we are exporting the model to use it in our project  











/* 
                        CONSTRUCTOR FUNCTION:-
    Constructor functions are typically written with an uppercase first letter 
    (by convention) to distinguish them from regular functions. When you call a 
    constructor function using the new keyword, it creates a new object, sets this 
    to refer to that object, and returns the object implicitly.

    EXAMPLE:- 
    function Person(name, age) {
        this.name = name;
        this.age = age;
  
        this.sayHello = function() {
        console.log(`Hello, my name is ${this.name}.`);
  };
}

    // Creating new instances of Person
    const person1 = new Person('John', 30);
    const person2 = new Person('Jane', 25);

    person1.sayHello(); // Output: Hello, my name is John.
    person2.sayHello(); // Output: Hello, my name is Jane.

*/