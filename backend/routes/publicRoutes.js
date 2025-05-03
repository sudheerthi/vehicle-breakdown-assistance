const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const authenticate = require('../middleware/authenticate');  

router.get('/mechanics', authenticate, publicController.getMechanics);
router.get('/mechanics1', publicController.getMechanics);

module.exports = router;
