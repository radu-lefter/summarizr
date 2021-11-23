const express = require('express');
const { getTranslations } = require('../controllers/translations');

const router = express.Router({ mergeParams: true });

router.route('/').get(getTranslations);

module.exports = router;