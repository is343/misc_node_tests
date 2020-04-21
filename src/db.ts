import pgPromise from 'pg-promise';
import DatabaseError from './errors';

const connection = {
  host: 'localhost',
  database: 'relay',
  port: 5432
};

// your protocol extensions:
interface IExtensions {
  createKeycloakUser(keycloakId: string, email: string): Promise<any>;
  findUser(userId: number): Promise<any>;
}

// pg-promise initialization options:
const options: pgPromise.IInitOptions<IExtensions> = {
  extend(obj) {
    (obj.createKeycloakUser = async (keycloakId, email) => {
      try {
        await obj.none('SELECT * FROM "user" WHERE keycloak_id = $1', [
          keycloakId
        ]);
      } catch (alreadyExistsError) {
        return new DatabaseError('Already exist', 409);
      }
    }),
      (obj.findUser = userId => {
        return obj.one('SELECT * FROM Users WHERE id = $1', userId);
      });
  }
};

const pgp = pgPromise(options);
const db = pgp(connection);

export default db;
