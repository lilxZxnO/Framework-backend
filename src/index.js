const express = require('express');
const app = express();


app.use(express.json());


const restaurantRoutes = require('./routes/restaurantRoutes');
const employeeRoutes = require('./routes/employeeRoutes');


app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API Restaurant' });
});


app.use('/api/restaurants', restaurantRoutes);
app.use('/api/employees', employeeRoutes);


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 