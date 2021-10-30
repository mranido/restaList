"use strict";

const mysql = require("mysql2/promise")
const config = require("../config")

let pool;

async function getPool(){
    if(!pool){
        pool = await mysql.createPool(config.db)
    }
    return pool
}

module.exports = {getPool};