const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, projectController.getAllProjects);
router.post('/', verifyToken, requireRole('manager'), projectController.createProject);
router.get('/:id', verifyToken, projectController.getProjectById);
router.put('/:id', verifyToken, requireRole('manager'), projectController.updateProject);
router.delete('/:id', verifyToken, requireRole('manager'), projectController.deleteProject);

module.exports = router;
