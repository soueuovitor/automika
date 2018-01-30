const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');
const fs = require ('fs');
const formidable = require('formidable');


router.get('/', function(request, response){
	//console.log(request.user);
	//console.log(request.isAuthenticated());
	model.list(function (veiculos) {
	response.set("Content-Type", "text/html");
	response.render('./veiculos-list', {
		data : veiculos
	})
})
});




router.get('/create', function(request, response) {
	response.set("Content-Type", "text/html");
	response.render('veiculos-item', {
		isNew: true,
		veiculos: {},
		errors: []
	})
});




router.get('/:username', function(request, response) {
	model.read(request.params.username, function(user) {
		if (user != undefined) {
			response.set("Content-Type", "text/html");
			response.render('clientes-item', {
				isNew: false,
				veiculos: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});





router.post('/create' , upload.array('logo', 4) ,function (request, response) {
	var form = new formidable.IncomingForm();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
    
      var oldpath = files.logo.path;
      var newpath = './public/img/' + fields.chassi+'.png';

      fs.rename(oldpath, newpath, function (err) {


	
	

		
		

	
		var data = {
			
			'matricula':fields.matricula,
		
			'chassi': fields.chassi,
			
			'ano' : fields.ano,

			'km' : fields.km,

			'marca' : fields.marca,

			'modelo' : fields.modelo,

			'cilindrada' : fields.cilindrada, 

			'valor_compra': fields.valor_compra,

			'valor_venda' : fields.valor_venda,

			'despesas': fields.despesas,

			'cv' : fields.cv
		};
		model.create(data, function () {
			
			
		});
		response.redirect('/veiculos')

							
			
			
	

});

});


});

module.exports = router;