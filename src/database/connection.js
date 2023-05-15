import sql from 'mssql';
import config from '../config';

const dbSettings = {
    user: config.dbUser,
    password: config.dbPassword,
    server: config.dbServer,
    database: config.dbDatabase,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
}

const pool = new sql.ConnectionPool(dbSettings);
//Sent a query to pool
/*pool.connect().then(pool => {
    const result = pool.request().query('SELECT TOP 10 * FROM contacts ORDER BY contactId DESC');
    result.then(recordset => {
        console.log(recordset);
        sql.close();
    }).catch(err => {
        console.error('Failed to retrieve data: ', err);
        sql.close();
    });
}).catch(err => console.error('Database Connection Failed! Bad Config: ', err));
*/
export default pool;

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export { sql };