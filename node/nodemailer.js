/*
SMTP - protocol that allows you to sendan email
POP3 - allows an email client to download an email fron an email server
IMAP - does POP3 from the server, takes up more space, more CPU usage

npm install nodemailer -g (global install, messes with other node modules, DON'T USE!!!)
require('nodemailer');

*/

let transporter = nodemailer.createTransport(transport[, defaults]); //for sake of assignment, make random email address

//transporter object
let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nodemailertowson@gmail.com',
        pass: 'xxxxx'
    }
})

//mail options as JSON
let mailOptions = {
    //sender address
    from: '"Andrew Knickman" <andrewsknick@gmail.com>',
    //list of receivers
    to: 'test@gmail.com'
    //subject line
    subject: 'Test Subject'
    //plain txt body
}

transporter.sendMail(data[,callback]);