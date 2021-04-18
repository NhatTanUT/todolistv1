const express = require("express");
const bodyParser = require("body-parser");
const path = require("path")

const app = express();

app.set('view engine', 'ejs'); // vi tri dat nen o sau dong app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

let newItems = [];
let newWorks = [];
 
app.get("/", function(req, res) {
  let today = new Date();
  let currentDay = today.getDay();
  // let day = today.toDateString().split(" ");

  let option = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }

  //dinh nghia lai thoi gian
  let day = today.toLocaleString("en-US", option);

  res.render("list", {listTittle: day, items: newItems})
});

app.get("/work", function(req, res) {
  res.render("list", {listTittle: "Work", items: newWorks})
});

app.post("/", function(req, res) {
  console.log(req.body);
  if (req.body.listTittle === "Work") {
    newWorks.push(req.body.item);
    res.redirect("/work");
  }
  else {
    newItems.push(req.body.item);
    res.redirect("/");
  }

});

app.listen(process.env.PORT || 3000, console.log("Server is listening on port 3000"));
