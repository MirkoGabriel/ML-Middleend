const express = require('express');
const { getItemDetails } = require('../controllers/itemsController');

const router = express.Router();

router.get('/:id', getItemDetails);

module.exports = router;
