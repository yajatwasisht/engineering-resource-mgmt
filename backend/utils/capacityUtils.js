const Assignment = require('../models/Assignment');
const User = require('../models/User');

exports.getAvailableCapacity = async (engineerId) => {
  const engineer = await User.findById(engineerId);
  const now = new Date();
  const activeAssignments = await Assignment.find({
    engineerId,
    startDate: { $lte: now },
    endDate: { $gte: now },
  });

  const totalAllocated = activeAssignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  return engineer.maxCapacity - totalAllocated;
};

exports.findSuitableEngineers = async (project) => {
  const engineers = await User.find({ role: 'engineer' });
  return engineers.filter(engineer =>
    project.requiredSkills.some(skill => engineer.skills.includes(skill))
  );
};
