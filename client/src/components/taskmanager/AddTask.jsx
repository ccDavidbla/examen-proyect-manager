import { useState } from 'react';
import './addtask.scss';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AddTask = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	const [state, setState] = useState({
		task: '',
		date: new Date(),
		formattedDate: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
		if (e.target.name === 'date') {
			const formattedDate = new Date(e.target.value).toISOString().slice(0, 10);
			setState({
				...state,
				formattedDate,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { task, date, formattedDate } = state;
		await dispatch(addTask({ task, date, formattedDate }));

		setState({
			task: '',
			date: new Date(),
			formattedDate: '',
		});
	};

	return (
		<div>
			<div className='addtask'>
				<form action='' onSubmit={handleSubmit}>
					<input
						type='text'
						name='task'
						placeholder='agregar tu proyecto'
						onChange={handleChange}
						value={state.task}
					/>
					<input
						type='date'
						name='date'
						placeholder='agregar fecha'
						onChange={handleChange}
						value={state.date}
					/>
					<button className='button'>Agregar Proyecto</button>
					<Link to='/dashboard' className='button'>
						Volver
					</Link>
				</form>
			</div>
		</div>
	);
};

export default AddTask;
