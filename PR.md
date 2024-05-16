# ENGWEB2024-Normal

## Persistência de Dados e Setup da Base de Dados

Para a persistência de dados, utilizei o MongoDB. A configuração da base de dados está localizada no arquivo `database.js` dentro do diretório `app/config`. O script de importação `importData.js` foi utilizado para carregar os dados do arquivo `dataset.json` para o MongoDB.

### Configuração da Base de Dados

- **Database**: contratos
- **Collection**: contratos

### Setup

```javascript
const mongoose = require('mongoose');

const dbURI = 'mongodb://mongodb:27017/contratos';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
