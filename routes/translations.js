const express = require("express");
const {
  getTranslations,
  getTranslation,
  addTranslation,
  updateTranslation,
  deleteTranslation,
} = require("../controllers/translations");

const Translation = require("../models/Translation");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route("/")
  .get(
    advancedResults(Translation, {
      path: "summary",
      select: "name description",
    }),
    getTranslations
  )
  .post(protect, authorize('publisher', 'admin'), addTranslation);

router
  .route("/:id")
  .get(getTranslation)
  .put(protect, authorize('publisher', 'admin'), updateTranslation)
  .delete(protect, authorize('publisher', 'admin'), deleteTranslation);

module.exports = router;
