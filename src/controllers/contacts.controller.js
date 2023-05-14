import {getConnection, sql} from '../database/connection';
import { queries } from '../database/querys';

export const getContacts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllContacts);
    console.log(result);

    res.json(result.recordset);
};

export const getLast10Contacts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getLast10Contacts);
    console.log(result);

    res.json(result.recordset);
};


export const createNewContact = async (req, res) => {
    const {name, surname1, surname2, email, phone, notes, contactType} = req.body;
    
    if (name == null || surname1 == null || contactType == null) {
        return res.status(400).json({msg: 'Bad Request. Please fill all fields'});
    }

    const pool = await getConnection();

    await pool.request()
    .input('name', sql.VarChar, name)
    .input('surname1', sql.VarChar, surname1)
    .input('surname2', sql.VarChar, surname2)
    .input('email', sql.VarChar, email)
    .input('phone', sql.VarChar, phone)
    .input('notes', sql.VarChar, notes)
    .input('contactType', sql.VarChar, contactType)
    .query(queries.createNewContact);

    const result = await pool.request().query(queries.getLast10Contacts);
    console.log(name, surname1, surname2, email, phone, notes, contactType);
    res.json(result.recordset);
    res.json('New contact created');
}

