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

const tedious = require("tedious");
//const tedious = require('tedious');
const { Connection, Request } = tedious;

const config2 = {
  server: 'JPABLIX',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'Pablito09'
    }
  },
  options: {
    database: 'caso3',
    trustServerCertificate: true
  }
};
const connection = new Connection(config);


export function getTediousConnection() {
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

  return new Promise((resolve, reject) => {
    const connection = new tedious.Connection(connectionConfig);

    connection.on("connect", (err) => {
      if (err) {
        reject(`Error connecting to the database: ${err}`);
      } else {
        console.log("Connected to the database.");
        resolve(connection);
      }
    });
  });
}

  
  




/*
export async function getTediusConnection() {
    console.log(config);
  
    const connection = new tedious.Connection(config);
    try {
      await new Promise((resolve, reject) => {
        connection.on("connect", (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Connected to the database.");
            resolve();
          }
        });
      });
      return connection;
    } catch (error) {
      console.error("Error connecting to the database:", error);
    } finally {
      dbSettings.port = defaultPort; // Restauramos el puerto por defecto
    }
  } */

  /*
  export async function getTediusConnection() {
    const connectionConfig = { ...config }; // Crear una copia de config
    connectionConfig.port = 5000; // Cambiar el puerto temporalmente
  
    const connection = new tedious.Connection(connectionConfig);
    return new Promise((resolve, reject) => {
      connection.on("connect", (err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Connected to the database.");
          connectionConfig.port = config.port; // Devolver el puerto a su valor original
          resolve(connection);
        }
      });
    });
  }*/
  
export { sql };