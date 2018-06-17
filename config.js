// let base64url = require('base64url');
// let crypto = require('crypto');

if (!process.env.EMAIL || !process.env.PASSWORD) {
  console.log('Please export EMAIL=myemail@mail.com && export PASSWORD=mypassword');
}

module.exports = {
  port: process.env.PORT || '3000',
  url: process.env.URL || 'http://localhost',
  myEmail : process.env.EMAIL,
  myPassword : process.env.PASSWORD,
  dogJsonOptions:{
    title:"Stringifying my dog",
    subtitle: 'This is my example Json dog.',
    body:"",
    dog : {
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
  }

  },
  homeOptions: {
    title: 'HOME',
    subtitle: 'What is this page?',
    body: 'This is an example about how to rendering ejs files in server. We are available to render ejs and send it automatically by email using nodemailer. You are looking my index.ejs, formed by header.ejs, main.ejs (where are this message) and footer.ejs.'
  }
};
