var app			= module.exports = express.createServer()
	, server	= require('nano')('http://127.0.0.1:5984/')
	, db_name	= 'test_database_crud'
	, db			= server.use(db_name);

function Create_database(res) {
	var action_result = server.db.create(db_name, function(err){
		if(err) { throw err; }
		console.log('Database created.');
		res.send('Database created.');
  });
}

function Save_document(res, doc) {
	var doc = {
			'_id': id.toString(),
			'name': 'tyrone',
			'age': '32',
			'height': '5f 6i',
			'favorite_food': 'goat meat'
		};
	
	return db.insert(doc, function(err, http_body, http_headers){
		if(err) { throw err; }
		id++;
		console.log('Database data inserted.');
		console.log(http_body);
		res.send('Database data inserted.');
	});
}

/*function Read_document(res, id) {
	return db.get(id, function(err, val){
		if(err) { throw err; }
		
		console.log('Database accessed and read.');
		console.log(val);
		res.send('Database accessed and read.');
		return val;
	});
}*/

function Read_document() {
	return {
	    "Videos": [
	        {
	            "id": 1,
	            "name": "Rabit movie",
	            "description": "Quisque quis mauris id velit adipiscing volutpat. Praesent venenatis purus ut lacus sollicitudin euismod. Quisque a purus arcu, a eleifend mi. In hac habitasse platea dictumst. Phasellus a porta eros. Maecenas volutpat nulla quis magna tempor ornare. Quisque ut tellus ut nibh commodo hendrerit. Proin id dui est. Donec auctor.",
	            "url": "http://www.youtube.com/watch?v=3Sk7cOqB9Dk",
	            "source": "Youtube",
	            "file_type": "Link"
	        }
	    ]
	}
}

function Update_document(res, id) {	
	db.get(id, function(err, doc){
		if(err) { throw err; }
		
		doc.name = 'joseph';
		
		db.insert(doc, function(err){
			if(err) { throw err; }
						
			return db.get(id, function(err, doc){
				if(err) { throw err; }
				
				console.log('Database updated.');
				console.log(doc);
			});
			
			res.send('Database updated.');
		});
	});
}

function Delete_document(res, id) {
	db.get(id, function(err, doc){
		if(err) { throw err; }
		
		console.log(doc);
		
		return db.destroy(id, doc._rev, function(err2){
			if(err2) { throw err2; }
			
			console.log("doc has been deleted");
			res.send("doc has been deleted");
		});
		
	});
}

modules.export.load = Read_document();