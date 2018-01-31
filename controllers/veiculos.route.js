const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');
const fs = require ('fs');
const formidable = require('formidable');
const resizeImg = require('resize-img');
var Jimp = require("jimp");


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
			response.render('veiculos-item', {
				isNew: false,
				veiculos: user,
				errors: []
			})		
		}else{
			response.status(404).end();
		}
	})	
});


router.post('/:matricula', function(request, response) {

	
	var data = {

		
		'ano' : request.body.ano,

		'km' : request.body.km,

		'marca' : request.body.marca,

		'modelo' : request.body.modelo,

		'cilindrada' : request.body.cilindrada, 

		'valor_compra': request.body.valor_compra,

		'valor_venda' : request.body.valor_venda,

		'despesas': request.body.despesas,

		'cv' : request.body.cv		
		
	};



		model.update(data, function () {
			
			response.redirect('/veiculos')
			
	
	})	
});



router.post('/create'  ,function (request, response) {

	var form = new formidable.IncomingForm();
	form.multiples = true;
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
	var i = 0;
	var paths = [];
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
		  if ((new Date().getTime() - start) > milliseconds){
			break;
		  }
		}
	  }
	var num_fotos = files.logo.length;
		for( var c of files.logo){
			
			var oldpath = c.path;

			var newpath = './public/img/' + fields.chassi  +'-'+ i +'.png';
		
			console	.log(oldpath);


			console.log(newpath);

		pics(oldpath,newpath);
	  i++



		  
		}

	

		function pics(oldpath, newpath){


			Jimp.read(oldpath, function (err, lenna) {
		

				
				if (err) throw err;
				lenna.resize(1024, 768)            // resize 
					 .quality(100)               
					               
					 .write(newpath); // save 
			});
			




		}

	
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

			'cv' : fields.cv,
			
			'num_fotos' : num_fotos
		};
		model.create(data, function () {
			
			
		});
		response.redirect('/veiculos')

							
			
			
	



});


});

module.exports = router;