const express = require('express');
const router = express.Router();
const model = require('../models/clientes.model');


router.get('/' ,global.secure('admin'), function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	model.list(function (clientes) {

	response.set("Content-Type", "text/html");
	response.render('./clientes-list', {

		
		clientes : clientes



	})
})
});

router.get('/create' ,global.secure('admin'), function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('clientes-item', {
		isNew: true,
		clientes: {}, 
		errors: []
	})
});


router.get('/:username' ,global.secure('admin'), function(request, response) {
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

router.post('/create', function(request, response) {
		var data = {
			'nome': request.body.nome,
			'morada': request.body.morada,
			'telemovel': request.body.telemovel,
			'email': request.body.email,
			'nif': request.body.nif
			
		};
		model.create(data, function(){
			response.redirect('/create-list');

		});
}); 

module.exports = router;