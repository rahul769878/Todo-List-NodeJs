const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');

let app = express();
let port = 3000;


let listItems = [];
let workItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

app.get("/",(req,res)=>{
    const day = date.getDate();

    res.render("list",{
      todayDate: day,
      items: listItems  
    })
})

app.post("/", function(req, res){
    if(req.body.listSubmit === "Work"){
      workItems.push(req.body.newTodo);
      res.redirect("/work");
    }else{
      listItems.push(req.body.newTodo);
      res.redirect("/");
    }
  });


app.get("/work", function(req, res){
    res.render("list", {
        todayDate: "Work List",
        items: workItems});
  });