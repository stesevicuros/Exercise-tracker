import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosApp } from '../util/axiosConfig';

const Exercise = (props) => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={'/edit/' + props.exercise._id}>edit</Link> |{' '}
			<button
				style={{
					border: 'none',
					backgroundColor: 'transparent',
					textDecoration: 'underline',
					color: '#0d6efd',
					padding: '0',
				}}
				herf='#'
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				delete
			</button>
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = { exercises: [] };
	}

	componentDidMount() {
		axiosApp
			.get('/exercises/')
			.then((response) => {
				this.setState({ exercises: response.data });
			})
			.catch((error) => console.log(error));
	}

	deleteExercise(id) {
		axiosApp
			.delete('/exercises/' + id)
			.then((res) => console.log(res.data));
		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id),
		});
	}

	exerciseList() {
		return this.state.exercises.map((currentExercise) => {
			return (
				<Exercise
					exercise={currentExercise}
					deleteExercise={this.deleteExercise}
					key={currentExercise._id}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
