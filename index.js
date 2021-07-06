const express = require('express');
app = express();
require('dotenv').config();

const JiraRoutes = require('./client/routes/jira');

app.use('/', JiraRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});