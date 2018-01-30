const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');

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





router.post('/create' ,  global.secure('admin'), function (request, response) {
	var form = new formidable.IncomingForm();
	var path = new Date().getTime();
	var fields = request.fields;
    form.parse(request, function (err, fields, files) {
      var oldpath = files.foto.path;
      var newpath = './public/img/galeria/' + path+ '.png';
      fs.rename(oldpath, newpath, function (err) {
		
		
		var type =  files.foto.type;
		var finalType = type.split('/');

		if (finalType[1] != 'jpeg' && finalType[1] != 'png' && finalType[1] != 'jpg'){
			response.json({
				error: "erro na base de dados",
				status: 500
			});
		}else{
		var data = {
			
			'name':fields.name,
		
			'path': path
		};
		model.create(data, function () {});
		response.json({
			success: "Updated Successfully",
			status: 200
			
		
		});
	
	
	
	}	
	})
})


	
});


module.exports = router;