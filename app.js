var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));

//Route
app.get('/', function (req, res) {
	res.render('index');
});

app.get('/about', function (req, res) {
	res.render('about');
});

app.get('/contact', function (req, res) {
	res.render('contact');
});

app.post('/contact/send', function (req, res) {
	let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
        	user: 'manish3257@gmail.com',
        	pass: 'manishcomp57'
    	}
	});

	let mailOptions = {
    from: 'Manish <manish3257@gmail.com>', // sender address
    to: 'manish3257@gmail.com', // list of receivers
    subject: 'Nodejs Project Test', // Subject line
    text: 'Testing... Name: '+req.body.name+'Email :'+req.body.email+'Message : '+req.body.message , // plain text body
    html: '<p>Testing...</p><ul><li>Name: '+req.body.name+'</li><li>Email :'+req.body.email+'</li><li>Message : '+req.body.message+'</li></ul>' // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
        res.redirect('/');
    }
    console.log('Message sent: '+info.response);
    	res.redirect('/');
	});
});

app.listen(8080); 
console.log('Server is running on port 8080...');