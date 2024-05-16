const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const contratosRoutes = require('./routers/contratos');

const app = express();

app.use(bodyParser.json());
app.use('/contratos', contratosRoutes);

const PORT = 16000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
