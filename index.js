const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config;
const port = process.env.PORT || 3000;
const queries = require('./queries');
const db = require('./queries')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/reviews', db.getReviews)
app.get('/reviews/:id', db.getReviewById)
app.post('/reviews', db.createReview)
app.put('/reviews/:id', db.updateReview)
app.delete('/reviews/:id', db.deleteReview)

app.get('/professors', db.getProfessors)
app.get('/professors/:id', db.getProfessorById)
app.post('/professors', db.createProfessor)
app.put('/professors/:id', db.updateProfessor)
app.delete('/professors/:id', db.deleteProfessor)

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});