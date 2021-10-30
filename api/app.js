"use strict";

const express = require("express");
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const companiesRouter = require('./routes/companies_routes');


app.use('/api/v1/company/', companiesRouter );

module.exports = app;