const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');
const fs = require ('fs');
const formidable = require('formidable');
const resizeImg = require('resize-img');


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





router.post('/create'  ,function (request, response) {

	var form = new formidable.IncomingForm();
	form.multiples = true;
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
	var i = 0;
	function sleep(milliseconds) {
		var start = new Date().getTime();
		for (var d = 0; d < 1e7; d++) {
		  if ((new Date().getTime() - start) > milliseconds){
			break;
		  }
		}
	  }
	var num_fotos = files.logo.length;
		for( var c of files.logo){
			
			var oldpath = c.path;


			var buf = num_fotos;

			var newpath = './public/img/' + fields.chassi  +'-'+ i +'.png';
			
	


		  		
			resizeImg(fs.readFileSync(oldpath), {width: 128, height: 128}).then(buf => {
				fs.writeFileSync(newpath, buf);
			});
	  
	  i++
			buf++;

sleep(1000);
			
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