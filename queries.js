const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'professor_reviews_api',
  password: process.env.DBPASSWORD,
  port: 5432,
});

const getReviews = (request, response) => {
  pool.query('SELECT * FROM reviews ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getReviewById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createReview = (request, response) => {
  const { professor_id, rating, text } = request.body;

  pool.query('INSERT INTO reviews (professor_id, rating, text) VALUES ($1, $2, $3)', [professor_id, rating, text], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Review added with ID: ${results.insertId}`);
  });
};

const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professor_id, rating, text } = request.body;

  pool.query(
    'UPDATE reviews SET professor_id = $1, rating = $2, text = $3 WHERE id = $4',
    [professor_id, rating, text, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM reviews WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

const getProfessors = (request, response) => {
  pool.query('SELECT * FROM professors ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getProfessorById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM professors WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createProfessor = (request, response) => {
  const {name, title, school, department} = request.body;

  pool.query('INSERT INTO professors (name, title, school, department) VALUES ($1, $2, $3, $4)', [name, title, school, department], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Professor added with ID: ${results.insertId}`);
  });
};

const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id)
  const {name, title, school, department} = request.body;

  pool.query(
    'UPDATE professors SET name = $1, title = $2, school = $3, department = $4 WHERE id = $5',
    [name, title, school, department, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Professor modified with ID: ${id}`);
    }
  );
};

const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM professors WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professor deleted with ID: ${id}`);
  });
};

module.exports = {
  getReviews, 
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getProfessors, 
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
};

