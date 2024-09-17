const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

// Crear una instancia de Express
const app = express();
const port = 3000;

// Configurar Sequelize para conectarse a la base de datos PostgreSQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Definir el modelo de "Mediciones"
const Medicion = sequelize.define('Medicion', {
  medicion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos
sequelize.sync().then(() => {
  console.log("Base de datos y tabla sincronizadas.");
});

// Rutas del servidor

// Ruta para obtener la última medición
app.get('/ultima-medicion', async (req, res) => {
  const ultimaMedicion = await Medicion.findOne({ order: [['createdAt', 'DESC']] });
  if (ultimaMedicion) {
    res.json(ultimaMedicion);
  } else {
    res.status(404).json({ error: 'No se encontraron mediciones' });
  }
});

// Ruta para agregar una nueva medición
app.post('/mediciones', express.json(), async (req, res) => {
  const { medicion, valor } = req.body;
  if (medicion && valor) {
    const nuevaMedicion = await Medicion.create({ medicion, valor });
    res.status(201).json(nuevaMedicion);
  } else {
    res.status(400).json({ error: 'Faltan parámetros' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
