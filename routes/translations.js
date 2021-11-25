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

router
  .route("/")
  .get(
    advancedResults(Translation, {
      path: "summary",
      select: "name description",
    }),
    getTranslations
  )
  .post(addTranslation);

router
  .route("/:id")
  .get(getTranslation)
  .put(updateTranslation)
  .delete(deleteTranslation);

module.exports = router;
