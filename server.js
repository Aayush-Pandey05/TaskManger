
const fs = require('fs'); // the fs module is used to perform read and write operations on the files 
const http = require('http'); /*this is the http module which is inbuilt in the nodejs*/ 
const _ = require('lodash');

const server = http.createServer((req,res)=>{/*this is a callback function which will be called each time a request is made to the server 
    here, the req stands for request and res stands for response */ 
    // console.log(req.url, req.method);/*This will print the url and the method i.e, get request*/ 

    //LODASH:- 
    const num = _.random(0,20);// this will give us a random number between 0 and 20 
    console.log(num);


    // set header content type
    // res.setHeader('Content-Type', 'text/plain');// the phrase 'text/plain' means that we are sending a plain text as response to the browser, we can also send a html page as well
    
    res.setHeader('Content-Type', 'text/html');// the phrase 'text/html' means that it will return html tags as the response    
    
    // res.write('<head><link rel="stylesheet" href="#"></head>');

    // res.write('<p>Hello i am aayush pandey</p>'); //this will write the response 
    // res.write('<p>I an a student of DSCE..... sadly</p>');

    let path = './views/'; // we are making use of the switch statements because we need to redirect the routes
    switch(req.url){
        case '/':
            path += 'index.html';// we are using concatination of strings
            res.statusCode = 200;// we are setting the status code to 200 becasuse everything is okay
            break;
        
        case '/about':
            path+= 'about.html';
            res.statusCode = 200;
            break;

        case '/about-me':
            res.statusCode = 301;// we are setting the status code to 301 becasuse we are permanently moving or redirecting the user to another page
            res.setHeader('Location','/about');// this will redirect the user to /about if the user visits /about-me 
            res.end();
            break;

        default:
            path+= '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path,(err,data)=>{ // we are reading the file which the path is specifing 
        if(err){
            console.log(err);
            res.end();// we are ending the request because we dont want the webpage to hang after the error has occured
        }
        else{
            // res.write(data); We can write this as well to write the data 
            res.end(data);// this is more preferable
        }
    })

    // res.end(); //this specifies that the response is ended and we can send it to the browser


    }) /*this is the method to create a server for us*/ 


server.listen(3000, 'localhost', ()=>{ /* local host is default host but just for the understanding we typed it out*/  
    console.log('listening for requests on port 3000')
})/* this method is created to listen for requests*/
 

/*      LOCAL HOST:- 
local host is like a domain name on the web just like google.com but,
this takes us to a specific ip address known as loop back ip address

this LOOP BACK IP ADDRESS is:- 127.0.0.1--> and this takes us back 
to our system */


/*     STATU CODES:- 
    200:- ok
    301:- resource moved
    404:- page not found 
    500:- internal server error */