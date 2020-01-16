var nodemialer = require('nodemailer');
let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nodemailertowson@gmail.com',
        pass: 'xxxxx'
    }
});

let mailOptions = {
    from: '"Andrew Knickman <nodemailertowson@gmail.com>',
    to: 'test@gmail.com',
    subect: 'Test Subject',
    text: 'Hello There',
    html: '<p> Hello There </p>'
};

//pass mailOptions and somecallback function
transporter.sendMail(mailOption, (error, info) => {
    if(error) {
        return console.log("Error!");
    }
});

var request = require('request');
var cheerio = require('cheerio');


request('https://news.ycombinator.com', function (error, response, html) {
	if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        // Not to be confused with forEach, this is jQuery
        $('td.title').each(function(i, element) {
            if (i % 2 == 1 && i < 20) {
                console.log($(this).text());
            }
        });
	}
});

//JSX code to tset a variable equal to HTML code
const classTitle = <h3>Welcome to Class!</h3>;
{classTitle};

function getName(user) {
    return user.firstName;
}
const user = {
    firstName: 'Andrew'
};
const jsxElement = (
    <h1>Student Name: {getName(user)}</h1>
);

//Conditional Rendering
function UserGreeting(props) {
    return <h1>Welcome Back!</h1>;
}
function GuestGreeting(props) {
    return <h1>Please sign up.</h1>; 
}
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting/>;
    }
    return <GuestGreeting/>;
}
ReactDOM.render(
    <Greeting isLoggedIn={false}/>,
    document.getElementById('root')
);