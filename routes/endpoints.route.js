var express = require('express');
var router = express.Router();
const { check, checkSchema } = require('express-validator/check')

var jsonfile = require('../controllers/endpoints.ctrl');

// setup routing and also validation
router.post('/update', [check('jsonToWrite').isJSON()], jsonfile.update);
router.post('/get', checkSchema({key: {isEmpty: {errorMessage: 'key should be at least 1 chars long',options: { min: 1 }}}}), jsonfile.get);

module.exports = router;