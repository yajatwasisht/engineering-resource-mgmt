const express = require('express');
const router = express.Router();
const {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} = require('../controllers/assignmentController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAssignments);
router.post('/', verifyToken, requireRole('manager'), createAssignment);
router.put('/:id', verifyToken, requireRole('manager'), updateAssignment);
router.delete('/:id', verifyToken, requireRole('manager'), deleteAssignment);

module.exports = router;
