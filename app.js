const express = require('express');
const database = require('./database');
const customers = require("./Routes/customerRoute");
const Transactions = require("./Routes/transactionsRoute");

const app = express();

var cors = require('cors');
app.use(cors({origin: '*'}));
app.use(express.json());

app.use('/transactions', Transactions);
app.use('/customers', customers);

const port = process.env.PORT || 8080;

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
