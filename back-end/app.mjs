import express from 'express';
import sequelize from './config/database.mjs';

const app = express();
const PORT = 3000;

await sequelize.authenticate();
console.log('Ok conection');

app.get('/', (req, res) => {
  res.send('API OK');
});

app.listen(PORT, () => {
  console.log(`Port:  ${PORT}`);
});