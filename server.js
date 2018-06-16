const port = process.env.PORT || 3000;
const url = process.env.URL || "localhost";
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;

//EXPRESS Web service
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");
var ejs = require("ejs");
var fs = require("fs");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function() {
  console.log("Server running on http://" + url + ":" + port);
});

//Routes
app.get("/", function(req, res) {
  res.render("index", {
    title: "Home",
    body: "Text in my home page. I hope you enjoy it."
  });
});

app.get("/json", function(req, res) {
  var dog = {
    head: {
      eyes: 2,
      color: "brown"
    },
    body: {
      legs: {
        number: 4,
        color: "white",
        weight: "15 Kg"
      },
      tail: {
        size: "short",
        color: "black"
      }
    }
  };
  res.render("index", {
    title: "My dog Json",
    body: JSON.stringify(dog, null, 4)
  });
});

app.get("/email", function(req, res) {
  res.render("emailSender", {
    title: "Email sender",
    body: ""
  });
});

app.post("/send", function(req, res, next) {
  console.log("req", req.body);

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "myPassword",
      pass: "myEmail"
    }
  });

  var templateString = fs.readFileSync("./views/email.ejs", "utf-8");
  let html = ejs.render(templateString, { text: req.body.body });

  let mailOptions = {
    from: '"Gorila Naranja" <gorillanaranja@gmail.com>', // sender address
    to: req.body.to, // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.body, // plain text body
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
    res.render("email");
  });
});
