const express = require('express');
const router = express.Router();
const model = require('../models/clientes.model');
const fs = require ('fs');
const formidable = require('formidable');
const resizeImg = require('resize-img');
var Jimp = require("jimp");



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

router.post('/createclientes', function(request, response) {
	var form = new formidable.IncomingForm();
	form.multiples = true;
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
	var i = 0;
	var paths = [];

	
	var num_fotos_cliente = files.fotocliente.length;
		for( var c of files.fotocliente){
			
			var oldpath = c.path;

			var newpath = './public/img/' + fields.nif  +'-'+ i +'.png';
		
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
			'nome':fields.nome,
			'morada': fields.morada,
			'telemovel': fields.telemovel,
			'email': fields.email,
			'nif': fields.nif,
			'cc': fields.cc,
			'num_fotos_cliente':num_fotos_cliente
			  
		};
		model.create(data, function(){
			
		});
		response.redirect('/clientes');

}); 
}); 
router.post('/update/:idclientes', function(request, response) {
	var data = {
		'nome': request.body.nome,
		'morada': request.body.morada,
		'telemovel': request.body.telemovel,
		'email': request.body.email,
		'nif': request.body.nif,
		'idclientes': request.params.idclientes
		  
	};
	model.update(data, function(){
		response.redirect('/clientes');

	});
}); 
router.get('/:idclientes/delete',  function(request, response){
	model.remove(request.params.idclientes, function() {
		response.redirect('/clientes');
	})	
});


module.exports = router;