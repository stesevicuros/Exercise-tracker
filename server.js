require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

const app = express();
const port = process.env.PORT || 3001;

const isProduction = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
mongoose.connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Serve static files when in production
if (isProduction) {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port} `);
});
