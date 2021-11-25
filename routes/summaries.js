const express = require('express');
const {
  getSummaries,
  getSummary,
  createSummary,
  updateSummary,
  deleteSummary,
  summaryPhotoUpload
} = require('../controllers/summaries');

// Include other resource routers
const translationRouter = require('./translations');

const router = express.Router();

const Summary = require('../models/Summary');
const advancedResults = require('../middleware/advancedResults');

// Re-route into other resource routers
router.use('/:summaryId/translations', translationRouter);

router.route('/:id/photo').put(summaryPhotoUpload);

router
  .route('/')
  .get(advancedResults(Summary, 'translations'), getSummaries)
  .post(createSummary);

router
  .route('/:id')
  .get(getSummary)
  .put(updateSummary)
  .delete(deleteSummary);

module.exports = router;