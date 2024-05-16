const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const Contrato = require('./app/models/contrato');
const db = require('./app/config/database');

mongoose.connect('mongodb://mongodb:27017/contratos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importCSV = () => {
  const results = [];
  fs.createReadStream('dataset.json') // Corrigido para JSON, assumindo que CSV foi convertido
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      Contrato.insertMany(results)
        .then(() => {
          console.log('Data Imported');
          mongoose.connection.close();
        })
        .catch((err) => {
          console.error('Error importing data:', err);
        });
    });
};

importCSV();
