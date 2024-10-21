const Task = require("../models/task"); // this will imprt the database model that we made



const task_index = (req,res) => {
  Task.find()
    .sort({ createdAt: -1 }) // this sort function will sort the tasks in descending order in which they were added
    .then((result) => {
      res.render("Tasks/index", { title: "All Tasks", tasks: result }); // this will pass the array containing the tasks to index.ejs and the title that is to be displayed on the home page
    })
    .catch((err) => {
      console.log(err);
    });
};

const task_details = (req, res) => {
  const id = req.params.id; // this will extract the route parameter which is having the name id in this case
  Task.findById(id)
    .then((result) => {
      res.render("Tasks/details", { task: result, title: "Task Details" });
    })
    .catch((err) => {
      res.status(404).render('404',{title: 'Task Not Found'});
    });
};

const task_create_get = (req,res)=>{
    res.render('Tasks/create',{ title: 'Create' }); 
};

const task_create_post = (req,res)=>{
    const task = new Task(req.body);// this will create a new database(task) and it will get its body from create.ejs

    task.save()// this will save the data in the index.ejs 
        .then((result)=>{
            res.redirect('/');
        })
        .catch((err)=>{
            console.log(err);
        })
};

const task_delete = (req,res)=>{
    const id = req.params.id;
    Task.findByIdAndDelete(id)// it goes to the database and finds the document or data from the id and delete it 
        .then((result)=>{
            res.json({redirect: '/'});// here we can't directly use res.redirect because we are using fetch method directly on the frontend and hence we are only allowed to give the response in the form of json 
         // we can say that this response is being sended to the frontend where the fetch method is used and we will handle it over there 
        }) 
        .catch((err)=>{
            console.log(err);
        });
}

module.exports = {
  // this will export all of these functions
  task_index,
  task_details,
  task_create_get,
  task_create_post,
  task_delete,
};
