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


module.exports = router;