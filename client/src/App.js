import React from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar';
import ExercisesList from './components/exercises-list';
import EditExercise from './components/edit-exercises';
import CreateExercise from './components/create-exercises';
import CreateUser from './components/create-user';

function App() {
	return (
		<Router>
			<Navbar />
			<div className='container ps-3'>
				<br />
				<Routes>
					<Route
						path='/'
						exact
						element={<ExercisesList />}
					/>
					<Route
						path='/edit/:id'
						element={<EditExercise />}
					/>
					<Route
						path='/create'
						element={<CreateExercise />}
					/>
					<Route
						path='/user'
						element={<CreateUser />}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
