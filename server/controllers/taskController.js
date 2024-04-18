const User = require('../../database/model/user.model');
const Task = require('../../database/model/task.model');

const addTask = async (req, res) => {
	const { task, id, formattedDate } = req.body;

	try {
		// Validate
		if (!task) return res.status(400).send('por favor agregue un proyecto');
		if (task.length < 10) return res.status(400).send('add minimum 10 char');
		const regex = /^\d{4}-\d{2}-\d{2}$/;
		if (!regex.test(formattedDate)) {
			return res.status(400).send('formato de fecha invalido, debe ser yyyy-MM-dd');
		}

		const taskDetail = await new Task({
			task,
			createdDate: new Date().getTime(),
			formattedDate,
			createdBy: id,
		});

		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('fallo al agregar');
	}
};


const getAllTasks = async (req, res) => {
	const { id } = req.query;

	try {
		let taskList = await Task.find({ createdBy: id }, { formattedDate: 1 });
		return res.status(200).send(taskList);
	} catch (error) {
		return res.status(400).send(error);
	}
};


const editTask = async (req, res) => {
	const { task, id } = req.body;

	try {
		if (!task) return res.status(400).send('por favor agregue un proyecto');
		if (task.length < 10) res.status(400).send('add minimum 10 char');
		const taskDetail = await new Task({
			task,
			cretedBy: id,
		});
		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('task addition failed');
	}
};

const statusChange = async (req, res) => {
	const { id, string } = req.body;

	try {
		let task = await Task.findById({ _id: id });
		if (string === 'right') {
			if (task.status === 'Pendiente') {
				task.status = 'En proceso';
				task.save();
				return res.send(task);
			} else if (task.status === 'EN proceso') {
				task.status = 'Completado';
				task.save();
				return res.send(task);
			} else if (task.status === 'Completado') {
				task.status = 'Pendiente';
				task.save();
				return res.send(task);
			}
		}
	} catch (error) { }
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};

module.exports = {
	addTask,
	getAllTasks,
	editTask,
	statusChange,
	deleteTask,
};
