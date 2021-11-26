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

const { protect, authorize } = require('../middleware/auth');

const Summary = require('../models/Summary');
const advancedResults = require('../middleware/advancedResults');

// Re-route into other resource routers
router.use('/:summaryId/translations', translationRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), summaryPhotoUpload);

router
  .route('/')
  .get(advancedResults(Summary, 'translations'), getSummaries)
  .post(protect, authorize('publisher', 'admin'), createSummary);

router
  .route('/:id')
  .get(getSummary)
  .put(protect, authorize('publisher', 'admin'), updateSummary)
  .delete(protect, authorize('publisher', 'admin'), deleteSummary);

module.exports = router;