const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        employees: true
      }
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        employees: true
      }
    });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant non trouvé' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name: req.body.name,
        location: req.body.location
      }
    });
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        location: req.body.location
      }
    });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    await prisma.restaurant.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Restaurant supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 