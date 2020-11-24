const mysql = require('mysql2/promise')

const config = require('../config/config.json')["SongLabtop"]

const pool = mysql.createPool({
    host : config.host,
    user : config.user,
    password : config.password,
    database : config.database,
    port : 3306,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})

async function query(sql, args) {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await pool.getConnection()

            const [rows, fields] = await pool.query(sql, args)

            conn.release()

            resolve(rows)
            
        } catch (err) {
            console.log(err);

            resolve([])
        }
    })
}

module.exports = query