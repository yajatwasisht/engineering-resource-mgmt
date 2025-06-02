const User = require('../models/User');

exports.getEngineers = async (req, res) => {
  const engineers = await User.find({ role: 'engineer' });
  res.json(engineers);
};

exports.getEngineerCapacity = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const assignments = await Assignment.find({ engineerId: id });
  const allocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
  const available = user.maxCapacity - allocated;
  res.json({ allocated, available });
};
