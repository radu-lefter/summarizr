const express = require('express');
const {
  getSummaries,
  getSummary,
  createSummary,
  updateSummary,
  deleteSummary
} = require('../controllers/summaries');

const router = express.Router();

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