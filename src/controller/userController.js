const { hashSync, compareSync } = require('bcrypt');
const pool = require('../models/db');
const { createToken } = require('../middleware/authUser');


class employeeUser {
    static async createAccount(req, res) {
         try {
            const { username, firstname, lastname, email, password, gender, jobrole, department, address} = req.body;
            const createSql = 'INSERT INTO employees (username, firstname, lastname, email, password, gender, jobrole, department, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
            const values = 
            [username, firstname, lastname, email, hashSync(password, 8), 
            gender, jobrole, department, address];
            const { rows } = await pool.query(createSql, values);
            console.log("rows", rows);
            const token = createToken( rows[0].id, rows[0].username, rows[0].firstname, rows[0].email);
            const { id } = rows[0];
            return res.status(201).json({ 
                status: 'success',
                data: {
                    "message": "User account successfully created",
                    token,
                    id 
                }
            })
           
         } catch (error) {
             console.log('error1', error);
             return res.status(500).json({
                 status: error,
                 error: error.message
             })
         }
        
    }
 
}




module.exports = employeeUser;