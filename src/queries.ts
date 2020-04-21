import express from 'express';
import pgPromise from 'pg-promise';
const pgp = pgPromise();

const pool = {
  query: (...arg) => {}
};

const connection = {
  host: 'localhost',
  database: 'relay',
  port: 5432
};

const db = pgp(connection);

function handleQueryError(response: express.Response, error: Error) {
  const errorMessage = `ERROR: ${error.name} - ${error.message}`;
  response.status(500).json(errorMessage);
}

async function getUser(request: express.Request, response: express.Response) {
  const { id } = request.params;
  try {
    await db.none('SELECT * FROM "user" WHERE keycloak_id = $1', [id]);
  } catch (alreadyExistsError) {
    return handleQueryError(response, alreadyExistsError);
  }
  response.status(200).json('users');
}

const getUsers = async (
  request: express.Request,
  response: express.Response
) => {
  // pool.query('SELECT * FROM intent ORDER BY id DESC', (error, results) => {
  try {
    const users = await db.none('SELECT * FROM "user" WHERE keycloak_id = $1', [
      `b4cc306a-c702-407b-95f5-e93b9a2cb8a8`
    ]);
    // success
    console.log(users);
    response.status(200).json(users);
  } catch (e) {
    // error
    console.log(e);
    handleQueryError(response, e);
  }
  // pool.query(
  //   'SELECT * FROM "user" WHERE keycloak_id = $1',
  //   [`b4cc306a-c702-407b-95f5-e93b9a2cb8a81`],
  //   (error, results) => {
  //     if (error) {
  //       return handleQueryError(response, error);
  //     }
  //     response.status(200).json(results);
  //   }
  // );
  // pool.query('SELECT * FROM "user" ORDER BY id DESC', (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).json(results.rows)
  // })
};

const getUserById = (request: express.Request, response: express.Response) => {
  return getUser(request, response);
  const id = parseInt(request.params.id);
  try {
    pool.query('SELECT * FROM "user" WHERE id = $1', [id], (error, results) => {
      if (error) {
        return handleQueryError(response, error);
      }
      response.status(200).json(results.rows);
    });
  } catch (err) {
    return handleQueryError(response, err);
  }
};

const createUser = (request: express.Request, response: express.Response) => {
  const { name, email } = request.body;
  // COPY public."user" (id, created_at, updated_at, telegram_id, citizenship, native_language, email, keycloak_id, uuid, username, dialect, facebook_id) FROM stdin;
  // 23235	2018-06-05 05:25:43.461623	2018-06-05 05:25:43.461623	505695961	unknown	unknown	\N	\N	e1abaed9-e5ea-4512-a01a-1573186e3242	shenluo	\N	\N
  pool.query(
    'INSERT INTO user (id, created_at, updated_at, telegram_id, citizenship, native_language, email, keycloak_id, uuid, username, dialect, facebook_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
    [
      23235,
      `2018-06-05 05:25:43.461623`,
      `2018-06-05 05:25:43.461623`,
      505695961,
      `unknown`,
      `unknown`,
      null,
      null,
      `e1abaed9-e5ea-4512-a01a-1573186e3242`,
      `shenluo`,
      null,
      null
    ],
    (error, results) => {
      // pool.query('INSERT INTO user (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(201).send(`User added with ID: ${results.insertId}`);
    }
  );
};

const updateUser = (request: express.Request, response: express.Response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request: express.Request, response: express.Response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
