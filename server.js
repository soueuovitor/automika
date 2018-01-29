const port = 8080;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');
const engines = require('consolidate');
var multer = require('multer');
var upload = multer({
	dest: '/.public/img/logos/'
});
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');


//new
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');






//This function will allow us to retrict the access to the routes
global.secure = function (type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				} else {
					response.redirect('/');
				}
			} else {
				return next();
			}
		}
		response.redirect('/');
	}
};
//end of 

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({
	extended: true
}));

//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (username, callback) {
	callback(null, username);
});




passport.deserializeUser(function (username, callback) {
	userModel.read(username, function (data) {
		callback(null, data);
	})
});
//end of new

app.set('view engine', 'ejs');
app.set('views', 'views');

global.connection = mysql.createConnection({
	host: 'webitcloud.net',
	user: 'webitclo_A254',
	password: 'PW1718A254499',
	database: 'webitclo_A254'
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function () {


	var j = schedule.scheduleJob('10 12 * * *', function (fireDate) {
	
		console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());

		const model = require('./models/admin.model');
		var nodemailer = require('nodemailer');
		h();

		function h() {
			var bilhetesUsers = [{}];

			model.listSessoes(function (sessoes) {

				model.listSpeakers(function (speakers) {
					model.listPatrocinadores(function (patrocinadores) {
						model.listColaboradores(function (colaboradores) {
							model.workshop(function (workshop) {
								model.listDias(function (dias) {
									model.listParticipantes(function (participantes) {
										model.list(function (bilhetes) {
											var data_hoje = new Date();
										
											var data_amanha = new Date(data_hoje.getTime() + (24 * 60 * 60 * 1000));



											for (var b of bilhetes) {

												for (var p of participantes) {
													var numeroBilhetes = 0;
													var user = 0;
													if (data_amanha.toLocaleDateString() == b.data_bilhete.toLocaleDateString() && b.username_comprador == p.username_part) {


														for (var p of participantes) {

															var numeroBilhetes = 0;
															var user = 0;
															var email = 0;


															if (data_amanha.toLocaleDateString() == b.data_bilhete.toLocaleDateString() && b.username_comprador == p.username_part) {

																numeroBilhetes++;
																user = b.username_comprador;
																email = p.email_part;
													


																for (var n of bilhetesUsers) {
																	if (n.username_array == p.username_part && data_amanha.toLocaleDateString() == n.data_bilhetes) {
																		n.numero = n.numero + 1;
																	} else {
																		var i = 0;
																		for (var e of bilhetesUsers) {
																			if (e.username_array == p.username_part && data_amanha.toLocaleDateString() == e.data_bilhetes) {
																				i++;
																			} else {

																			}
																		}
																		if (i == 0) {
																			bilhetesUsers.push({
																				'numero': 0,
																				'data_bilhetes': b.data_bilhete.toLocaleDateString(),
																				'username_array': user,
																				'email_array': email
																			});
																		
																			console.log(e.username_array + ' estou aqui');
																		}
																	}

																}

															}

														}


													}
												}




											}

























											var transporter = nodemailer.createTransport({
												service: 'gmail',
												auth: {
													user: 'nortephotographyminho@gmail.com',
													pass: 'gonca1234'
												}
											});
											for (var p of bilhetesUsers) {


												var mailOptions = {
													from: 'nortephotographyminho@gmail.com',
													to: p.email_array,
													subject: 'Norte Photography Workshop',
													html: '<h1>Não se esqueça de nos visitar!</h1>' + '<p>Olá ' + p.username_array + ' Não se esqueça que tem bilhete para alguns do melhores workshops no dia '+ p.data_bilhetes + '</p>'
												};

												transporter.sendMail(mailOptions, function (error, info) {
													if (error) {
														console.log(error);
													} else {
														console.log('Email sent: ' + info.response);
													}
												});


											}




										});
									});
								});
							});
						});
					});
				});
			});
		};











	});
	console.log('Server started at: ' + port);

});

//Midleware that sets the isAuthenticated variable in all views

app.use(function (request, response, next) {
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});



app.use('/public', express.static('public'));

//app.use('/users', require('./controllers/user.route'));

//new
