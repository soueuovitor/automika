module.exports = {
	list(callback) {
		var sql = 'SELECT * from clientes';
		global.connection.query(sql, function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
			
		});
	},

	dropdown(callback) {
		var sql = 'SELECT nome from clientes';
		global.connection.query(sql, function(error, rows, fields){
			if (error) throw error;
			callback(rows);
		});
	},

	read(username, callback) {
		var sql = "SELECT * from clientes where idclientes=?";
		global.connection.query(sql, [username], function (error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);
		});
	},



	create(data, callback) {
		var sql = "INSERT INTO clientes (nome, morada, telemovel, email, nif) VALUES (?,?,?,?,?)";
		global.connection.query(
			sql, [data.nome, data.morada, data.telemovel, data.email, data.nif],
			function (error, rows, fields) {
				if (error) throw error;
				callback(rows[0]);
			});
	},

	remove(data, callback) {
		var sql = "DELETE from clientes WHERE idclientes=?";
		global.connection.query(sql, [data], function (error, rows, fields) {
			if (error) throw error;
			callback(rows);
		});
	},
	update( data, callback) {
		var sql = "UPDATE clientes SET nome=?, morada=?, telemovel=?, email=?, nif=?  WHERE idclientes=?"; 
		global.connection.query(
			sql, [data.nome, data.morada, data.telemovel, data.email, data.nif, data.idclientes], function(error, rows, fields) {
			if (error) throw error;
			callback(rows[0]);			
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