module.exports = {
	list(callback) {
		var sql = 'SELECT * from veiculos';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
			
		});
	},


	create(data, callback) {
		var sql = "INSERT INTO veiculos (matricula, chassi, marca , km, cilindrada, cv, valor_compra, valor_venda, despesas, ativo, modelo , ano) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
		global.connection.query(
			sql, [data.matricula, data.chassi, data.marca, data.km, data.cilindrada, data.cv, data.valor_compra, data.valor_venda, data.despesas, 1 , data.modelo, data.ano ],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},








	remove(username, callback) {
		var sql = "DELETE from clientes WHERE idcliente=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},

	/*
	takenUsername(username, callback) {
	    
	    var sql = "SELECT password FROM participantes WHERE username=?"
	    var user = global.connection.query(SQL, [username] );
	                                       
	                                       
	                function bit (error, rows, fields){
				     if (user === undefined)  {callback(true);
	                    }else{
	                        callback(false);
	                    }
	    }
	},
	                   
	*/




	//New
	areValidCredentials(username, password, callback) {
		var sql = "SELECT password FROM users WHERE username=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			if (rows.length == 1 && rows[0].password === password) {
				callback(true);
			} else {
				callback(false);
			}
		});
	}

	

};