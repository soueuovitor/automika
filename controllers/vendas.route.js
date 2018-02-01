const model = require('../models/vendas.model');
const cli = require('../models/clientes.model');
const vei = require('../models/veiculos.model');
const express = require('express');
const router = express.Router();


router.get('/', global.secure('admin'), function(request, response) {
	model.list(function(vendas) {
		response.set("Content-Type", "text/html");
		response.render('vendas-list', {
			data: vendas
		})
	})	
});

router.get('/createvendas',global.secure('admin'), function(request, response) {
	cli.dropdown(function(clientes) {
		vei.dropdown(function(veiculos) {
			response.set("Content-Type", "text/html");
			response.render('vendas-item', {
				clientes : clientes,
				veiculos : veiculos,
				isNew: true,
				vendas: {},
				errors: []
			})
		})
	})
});


module.exports = router;