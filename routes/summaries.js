const express = require('express');
const {
  getSummaries,
  getSummary,
  createSummary,
  updateSummary,
  deleteSummary
} = require('../controllers/summaries');

// Include other resource routers
const translationRouter = require('./translations');

const router = express.Router();

// Re-route into other resource routers
router.use('/:summaryId/translations', translationRouter);

router
  .route('/')
  .get(getSummaries)
  .post(createSummary);

router
  .route('/:id')
  .get(getSummary)
  .put(updateSummary)
  .delete(deleteSummary);

module.exports = router;