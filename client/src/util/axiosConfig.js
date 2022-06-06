import axios from 'axios';

export const axiosApp = axios.create({
	baseURL:
		process.env.NODE_ENV === 'production'
			? 'https://exercise-tracker-uros.herokuapp.com'
			: 'http://localhost:5000',
});
