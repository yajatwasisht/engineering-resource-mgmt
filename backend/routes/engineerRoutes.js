const express = require('express');
const router = express.Router();
const { getEngineers, getEngineerCapacity } = require('../controllers/engineerController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, requireRole('manager'), getEngineers);
router.get('/:id/capacity', verifyToken, getEngineerCapacity);

module.exports = router;