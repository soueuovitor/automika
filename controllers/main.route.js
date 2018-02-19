const express = require('express');
const router = express.Router();
const model = require('../models/veiculos.model');

router.get('/', function(request, response){
	//console.log(request.isAuthenticated());
	model.list(function (veiculos) {

	response.set("Content-Type", "text/html");
	response.render('./front-end/index', {
		data: veiculos
	})
})

});

module.exports = router;