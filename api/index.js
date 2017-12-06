/*
authors: Deborah Powers, Karim, Loic, Matthieu
school: Simplon Lieusaint
creation: 2017/12/06

projet d'application

dependences:
	express
*/

// appeler les modules
const fileSystem = require ('fs');
const express = require ('express');

var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  next();
});

// le json
const fileUsers = './listUsers.json';

var userList = require (fileUsers);
var router = express.Router();

const tokenGood = 'bon-token';
const tokenBad = 'mauvais-token';
var token = tokenBad;

// const tokenList =[
// 	'coucouAnas',
// 	'CaptainUse',
// 	'HowOldAreU',
// 	'1407',
// 	'1002',
// 	'matthieu!!!!!!'
// ];

// les fonctions

app.listen (3000, function(){
	console.log ('ecoute sur le port 3000');
});
// afficher les utilisateurs
app.get('/listUser', function (req, res){
	if (token == tokenGood){
		res.status (200);
		res.send (userList);
	}
	else{
		res.status (404);
		res.send ('vous ne pouvez pas acceder a cette page');
	}
});
// loggin page, creer le token
app.post ('/login', function (req, res){
	// si les deux parametres ont ete donne
	if (req.body.username && req.body.password){
		var username = req.body.username;
		var password = req.body.password;
		// verifier si le profil existe
		function findTheUser (user){
			IAmTheUser = false;
			if (user.username == username && user.password == password)
				IAmTheUser = true;
			return IAmTheUser;
		}
		var user = userList.find (findTheUser);
		// profil inconnu
		if (! user){
			res.status (404);
			res.send ('profil inconnu');
		}
		// profil reconnu
		else{
			res.status (200);
			res.send({status: true, token: tokenGood})
		}
	}
	// si l'utilisateur oublie des infos
	else{
		res.status (404);
		res.send ("vous avez oublie des parametres, entrez un nom d'utilisateur et un mot de passe");
	}
});
// creer un compte
app.post ('/create-account', function (req, res){
	// si les parametres ont ete donne
	if (req.body.username && req.body.password && req.body.firstName && req.body.lastName && req.body.age){
		var Busername = req.body.username;
		var Bpassword = req.body.password;
		var BfirstName = req.body.firstName;
		var BlastName = req.body.lastName;
		var Bage = req.body.age;
		// verifier si le profil existe
		function findTheUser (user){
			IAmTheUser = false;
			if (user.username == Busername && user.password == Bpassword)
				IAmTheUser = true;
			return IAmTheUser;
		}
		var user = userList.find (findTheUser);
		// profil reconnu
		if (user){
			res.status (404);
			res.send ('le profil existe deja');
		}
		// profil inconnu
		else{
			res.status (200);
			res.send ('profil en creation');
			token = tokenGood;
			var newUser ={
				username: Busername,
				password: Bpassword,
				firstName: BfirstName,
				lastName: BlastName,
				age: Bage
			};
			userList.push (newUser);
			fileSystem.writeFile (fileUsers, JSON.stringify (userList), function(error){
				if (error) console.log ("le json n'a pas put etre modifie"); });
		}
	}
	// si l'utilisateur oublie des infos
	else{
		res.status (404);
		res.send ("vous avez oublie des parametres");
	}
});

router.post('/auth', function(req, res) {
  let index = Math.floor(Math.random() * tokenList.length);

  res.status(200).send({status: true, token: tokenList[index]})
});

// app.post('/login', function(req, res) {

// 	var body = req.body;

// 	if (body.username == 'CaptainYouz' && body.password == '1407') {

// 		res.send('You did it')
// 	} else {
// 		res.send('Try again')
// 	}
// });