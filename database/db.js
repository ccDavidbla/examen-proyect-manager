const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost/task-managerdb';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error al conectar a MongoDB:', error);
	});
