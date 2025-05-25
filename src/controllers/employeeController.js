const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        restaurant: true
      }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        restaurant: true
      }
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employé non trouvé' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        active: req.body.active,
        restaurant_id: parseInt(req.body.restaurant_id)
      },
      include: {
        restaurant: true
      }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const employee = await prisma.employee.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: req.body.name,
        email: req.body.email,
        active: req.body.active,
        restaurant_id: parseInt(req.body.restaurant_id)
      },
      include: {
        restaurant: true
      }
    });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await prisma.employee.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Employé supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 