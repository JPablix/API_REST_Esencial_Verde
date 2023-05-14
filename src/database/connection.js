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

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

export { sql };



//////////////////////////////// TEDIOUS ////////////////////////////////

/*
const Request = require("tedious").Request;
const Connection = require("tedious").Connection;

const connectionConfig = {
  server: config.dbServer,
  authentication: {
    type: "default",
    options: {
      userName: config.dbUser,
      password: config.dbPassword,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    database: config.dbDatabase,
  },
};

const connection = new Connection(connectionConfig);

connection.connect();

connection.on("connect", (err) => {
  if (err) {
    console.error(`Error connecting to the database: ${err}`);
    throw err;
  } else {
    executeStatement();
  }
});

function executeStatement() {
  console.log("Connected to database by tedious");
  const request = new Request("SELECT TOP 10 * FROM contacts ORDER BY contactId DESC", (err, rowCount, rows) => {
    if (err) {
      console.log(`Error querying the database: ${err}`);
      throw err;
    }
    connection.close();
  });
  request.on("row", (columns) => {
    console.log(columns);
  });
  connection.execSql(request);
}
*/
///////////////////////////

//const { Request } = require('tedious');


const { ConnectionPool, Request } = require("tedious");


const poolConfig = {
  min: 1,
  max: 10,
  log: false,
};

const connectionConfig = {
  port: 3000,
  userName: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  options: {
    encrypt: true,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const pool = new ConnectionPool(poolConfig, connectionConfig);

pool.on('error', err => {
  console.error('Error connecting to the database:', err);
});

console.log(pool);

const request = new Request('SELECT 1', (err, rowCount, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Returned ${rowCount} row(s)`);
    console.log(rows);
  }
});

pool.acquire((err, connection) => {
  if (err) {
    console.error(err);
  } else {
    connection.execSql(request);
  }
});


/*
pool.on('error', err => {
  if (err) {
    pool.on('debug', text => {
      console.log(`Database debug info: ${text}`);
    });
  } else {
    console.log('Connected to the database');
  }
});


pool.on('connect', () => {
  console.log('Connected to the database');

  const request = new tedious.Request('SELECT 1', (err, rowCount, rows) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Returned ${rowCount} row(s)`);
      console.log(rows);
    }
  });

  request.execute();
});

*/


/*
pool.acquire((err, connection) => {
  if (err) {
    console.error(`Error acquiring database connection: ${err}`);
    throw err;
  } else {
    console.log("Connected to database by tedious-connection-pool");
  }
  
  const request = new Request("SELECT TOP 10 * FROM contacts ORDER BY contactId DESC", (err, rowCount, rows) => {
    if (err) {
      console.log(`Error querying the database: ${err}`);
      throw err;
    }
    connection.close();
  });
  request.on("row", (columns) => {
    console.log(columns);
  });
  connection.execSql(request);
});
*/