const express = require('express');
const router = express.Router();
const model = require('../models/clientes.model');


router.get('/', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	model.list(function (clientes) {

	response.set("Content-Type", "text/html");
	response.render('./clientes-list', {

		
		clientes : clientes



	})
})
});

router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('clientes-item', {
		isNew: true,
		clientes: {},
		errors: []
	})
});


router.get('/:username', function(request, response) {
	model.read(request.params.username, function(user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('clientes-item', {
				isNew: false,
				clientes: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});

module.exports = router;