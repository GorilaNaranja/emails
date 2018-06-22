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
  how:{
    title:"",
    subtitle: 'How is the email sent?',
    body:"We use Nodemailer, a module for Node.js applications to send emails. For more information visit its official website or check my github in the link below."
  },
  homeOptions: {
    title: 'WELCOME',
    subtitle: 'What is this?',
    body: 'This is an example of a simple api that renders views on the server and allows you to send emails. You can choose three different templates and customize the recipient, the subject and the text of your email. Do not forget to put your environment variables EMAIL and PASSWORD to define the outgoing email.',
  }
};
