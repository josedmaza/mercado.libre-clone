const express = require('express');
const { getItems, getItemDetail } = require('../controllers/itemsController');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemDetail);

module.exports = router;
