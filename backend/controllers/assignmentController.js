const Assignment = require('../models/Assignment');

exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find().populate('engineerId').populate('projectId');
  res.json(assignments);
};

exports.createAssignment = async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.status(201).json(assignment);
};

exports.updateAssignment = async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(assignment);
};

exports.deleteAssignment = async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
