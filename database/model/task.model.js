const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
	{
		task: {
			type: String,
			require: "debe tener más de 3 letras",
		},
		date: {
			type: Date,
			require: true
		},
		status: {
			type: String,
			enum: ['Completado', 'En proceso', 'Pendientes'],
			default: 'Pendientes',
		},
		createdDate: {
			type: Number,
			require: true
		},
		formattedDate: {
			type: String,
			require: true
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamp: true }
);


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
