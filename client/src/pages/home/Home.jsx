import './home.scss';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Home = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;
	return (
		<div className='home'>
			<div className='home__container'>
				<h2>Organizar todo</h2>
				<p>Con TaskManager</p>

				{currentUser && currentUser.token ? (
					<Link to='/dashboard' className='button'>
						Empezar
					</Link>
				) : (
					<Link to='/signin' className='button'>
						Iniciar Sesión
					</Link>
				)}
			</div>
		</div>
	);
};

export default Home;
