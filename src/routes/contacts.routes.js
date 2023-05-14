import { Router } from 'express';
import * as tedious from 'tedious';
import { getContacts, createNewContact } from '../controllers/contacts.controller';
import { Request } from "tedious";
import { getTediousConnection } from '../database/connection';

const router = Router()


//router.get('/contacts', getContacts);
//const tedious = require("tedious");
/*router.get("/contacts/", async (req, res) => {
    const connection = await getTediusConnection(); // obtén la conexión
    const request = new tedious.Request("SELECT TOP 10 * FROM contacts", (err, rowCount, rows) => {
      if (err) {
        console.log(`Error querying the database: ${err}`);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(`${rowCount} rows returned.`);
        res.send(rows);
      }
    });
    connection.execSql(request);
});*/
router.get("/contacts/", async (req, res) => {
  try {
    const connection = await getTediousConnection();
    const request = new tedious.Request("SELECT TOP 10 * FROM contacts", (err, rowCount, rows) => {
      if (err) {
        console.log(`Error querying the database: ${err}`);
        res.status(500).send("Internal Server Error");
      } else {
        console.log(`${rowCount} rows returned.`);
        res.send(rows);
      }
    });
    connection.execSql(request);
  } catch (error) {
    console.log(`Error connecting to the database: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

  
  
  

router.post('/contacts', createNewContact);

router.get('/contacts/', );

router.delete('/contacts', );

router.put('/contacts', );

router.get('/contacts', );

export default router;