const express = require('express');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/items', itemsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
