import { Link } from "react-router-dom";
import { useState } from 'react';
import './addtask.scss';
import { addTask } from '../../redux/taskSlice';
import { useDispatch, useSelector } from 'react-redux';
const EditTask = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	const [state, setState] = useState({
		task: '',
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addTask(state.task, currentUser.id));
		setState({
			task: '',
		});
	};
	return (
		<div>
			<div className='edittask'>
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
					<button className='button'>Guardar edición</button>
					<Link to='/dashboard' className='button'>
						Volver
					</Link>
				</form>
			</div>
		</div>
	)
};

export default EditTask;
