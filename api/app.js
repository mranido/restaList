"use strict";

const express = require("express");
const cors = require('cors');
const fileupload = require('express-fileupload');



const app = express();

app.use(fileupload());

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const companiesRouter = require('./routes/companies_routes');
const officesRouter = require('./routes/offices_routes');


app.use('/api/v1/company/', companiesRouter );
app.use('/api/v1/office/', officesRouter);

module.exports = app;