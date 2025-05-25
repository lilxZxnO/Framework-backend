const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const restaurantRoutes = require('./routes/restaurantRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 