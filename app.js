const express = require('express');
const morgan = require('morgan');/*this is a third party middleware which we installed
by typing npm install morgan:- you can read the docs from the npm website....
*/ 
const mongoose = require('mongoose');// we are importing mongoose
// const Task = require('./models/task'); we are no longer using this model in this file, insted we will cut it and paste it in taskRoutes.js
const taskRoutes = require('./routes/taskRoutes')


// EXPRESS APP:-


const app = express();

const dbURI = "mongodb+srv://userName:password@cluster0.4dqgf.mongodb.net/node-js-project?retryWrites=true&w=majority&appName=Cluster0";// this is to connect with mongodb
mongoose.connect(dbURI)
// now mongoose will connect to the above mentioned databse for us 
//{ useNewUrlParser: true, useUnifiedTopology: true}--> this object will not make any difference... it will just discard the warnings if there are any while running the server(it is not neccessary)
    .then((result)=>{
        app.listen(3001) //we will only listen for requests once the database is connected
    })
    .catch((err)=>{
        console.log(err)// printing the error if there is any....
    });


//REGISTER VIEW ENGINE:- 

app.set('view engine', 'ejs');// app.set helps us to use the application settings such as register for the view engine etc.
// we will use ejs as our template to make dynamic html pages(i am not sure what does this mean.....xd)
//NODE will by default look for ejs files in the views file so it is recommended to put your ejs files there 

/*Now if you want to use some other folder to keep your ejs templates you can use
the command:- app.set('views', 'myviews')--> here the 'myviews' is where the NODE 
will now look for the ejs files */

//Listening for requests:- 

// app.listen(3000);// it will listen for the requests from the server at the port 3000(localhost:- by default) it will also return an instance of the server 

//Now we are creating a middleware which will be fired for every request:- 
// app.use((req, res, next) => {  // Add next as the third argument
//     console.log("A request was made..");
//     console.log("Host: ", req.hostname);  // req.hostname is a property of the request
//     console.log("Path: ", req.path);
//     console.log("Method: ", req.method);
//     next();  // Call next() to move to the next middleware function
// });// if we only write this code, the express app will not be knowing how to move to the next bit of code



/*Now we are using morgan:- */
app.use(morgan('dev'));// morgan('dev') is a function of morgan we can read about it in the npm website we can also type tiny in the place of dev


/*NOW WE WILL USE THE STATIC FILE*/
app.use(express.static('public'));// now we re using the static function which comes with express which helps us to access css files and public is the folder name in which it will look for the css files

/* this is for accepting the form data */
app.use(express.urlencoded({extended: true})); // this is a middleware which will encode the data to the request in /tasks post request section which will help us to access the data the encoded:true part is optional


// mongoose and mongo sandbox routes:-
app.get('/add-task',(req,res)=>{
    const task = new Task({
        title: 'TASK 2',
        taskday: 'Tuesday',
        body: 'complete rpa record'
    });

    task.save()// here as we create new instance of the Task model, mongoose looks for tasks in the mongo db database and auto saves the data there.... it takes some time and therefore it is an asynchronous task and it returns a promise
        .then((result)=>{
            res.send(result);// this will send back the object which is saved by mongoose in mongo db to the browser
        })
        .catch((error)=>{
            console.log(error);
        });
})


// app.get('/all-tasks',(req,res)=>{
//     Task.find()// this will get us all the tasks that have been created
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         }); 
// })


app.get('/', (req,res)=>{ // this will listen for the requests with only'/'
    // res.send('<p>Hello guys its me</p>')// this method will autometically set the header depending on the file we are sending and it will also set the status code by itself
    // res.sendFile('./views/index.html', { root: __dirname })// './views/index.html'--> this is not a relative path, insted it is an absolute path, this means that we need to specify exact location of the file in our computer  
    //  { root: __dirname }--> this parameter/object specifies the current directory we are in i.e, NODE-CRASH-COURSE

    // const tasks = [
    //     {title: 'Aayush the great', snippet: 'Aayush Pandey needs to complete his records and observation of the labs'},
    //     {title: 'Aayush the great', snippet: 'Aayush Pandey needs to complete his records and observation of the labs'},
    //     {title: 'Aayush the great', snippet: 'Aayush Pandey needs to complete his records and observation of the labs'},
    // ];

    // res.render('index',{ title: 'Home', tasks });//The object:- {title: Home} is used for dynamic input in the title of the home page with this function NODE looks in the views folder and look for the view file named index and render it to the browser on our request 
    // there is no need to write the extention of the file... NODE will figure it out   
    // here we could have stored tasks in some other variable by writing lol:tasks where lol would have been the variable
    

    res.redirect('/tasks');
})

app.get('/about', (req,res)=>{
    // res.sendFile('./views/about.html', { root: __dirname });
    res.render('about',{ title: 'About' });
})

// redirecting the request:- 

app.get('/about-us', (req,res)=>{
    res.redirect('/about');// this will redirect the user to /about when we are requesting /about-us
})




// taskRoutes:- 

app.use('/tasks',taskRoutes);// now here we have specified that we will only go to tsakRoutes once the url contains /task.... therefore we can remove the /tasks bit from the file taskRoutes







//404 Request:- 

app.use((req,res)=>{// this callback function will be fired if the requested url doenot match any conditions above this code
    // res.status(404).sendFile('./views/404.html', { root: __dirname });

    res.status(404).render('404',{ title: '404 - Page Not Found' }); 

})// if we would have given this above any other code, it would have been fired before the required page as node checks the code line wise... and if it sees the us efunction it will fire it 
// the use function doesnot set the status code by itself so we need to do it manually..

/* we are using mongoose in this project(npm i mongoose) */


/*    
                ROUTE PARAMETERS:- 
    route parameters are the part of the route which can be variable
    eg:- localhost:3000/tasks/:id :- here if id is variable then it is known as
    route parameter



*/