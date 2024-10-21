const express = require('express');
// const Task = require('./models/task'); we are no longer using this model in this file, insted we will cut it and paste it in taskController.js
const { task_index, task_details, task_create_get, task_create_post, task_delete } = require('../controllers/taskController');

const router = express.Router(); // now we will replace app with router

// All the functions are being exported from taskController.js

router.get('/create',task_create_get); 

router.get('/',task_index);

router.post('/', task_create_post);// if we will get a post request on  then we will perform the following tasks

router.get('/:id',task_details);

router.delete('/:id', task_delete)// once the delete request is sended to the '/:id' dfrom details.ejs the function will be triggered

module.exports = router; // we can import this in app.js and use it there 