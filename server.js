var config = require('./config.js');

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

app.listen(config.port, function() {
  console.log("Server running on " + config.url + ":" + config.port);
});

//Routes
app.get("/", function(req, res) {
  res.render("index", {
    title: config.homeOptions.title,
    subtitle:config.homeOptions.subtitle,
    body: config.homeOptions.body
  });
});

app.get("/how", function(req, res) {
  res.render("index", {
    title: config.how.title,
    subtitle:config.how.subtitle,
    body: config.how.body
  })
});

app.get("/email", function(req, res) {
  res.render("emailSender", {
    title: "Email sender",
    subtitle: "Pleas send an email",
    body: ""

  });
});

app.post("/send", function(req, res, next) {
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.myEmail,
      pass: config.myPassword
    }
  });

  let templateString = fs.readFileSync("./views/templates/"+req.body.template, "utf-8");
  let html = ejs.render(templateString, {text:req.body.body,});

  let mailOptions = {
    from: '"Gorila Naranja" <gorillanaranja@gmail.com>',
    to: req.body.to,
    subject: req.body.subject,
    html: html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent to: " + req.body.to);
    res.render("index", {
      title: "Successfully!",
      subtitle: "",
      body: "Message sent to " + req.body.to
    });
  });

});
