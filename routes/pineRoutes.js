const express = require('express');
const router = express.Router();
const controller = require('../controllers/pineController');

// POST /api/upload
router.post('/upload', controller.upload);

// POST /api/status
router.post('/status', controller.getStatus);

// POST /api/cancel
router.post('/cancel', controller.cancel);
 
// POST /api/void 
router.post('/void', controller.voidTransaction);

// POST /api/ForceCancel
router.post('/forceCancel', controller.forceCancel);

module.exports = router;