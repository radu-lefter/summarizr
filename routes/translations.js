const express = require("express");
const {
  getTranslations,
  getTranslation,
  addTranslation,
  updateTranslation,
  deleteTranslation,
} = require("../controllers/translations");

const router = express.Router({ mergeParams: true });

router.route("/").get(getTranslations).post(addTranslation);

router
  .route("/:id")
  .get(getTranslation)
  .put(updateTranslation)
  .delete(deleteTranslation);

module.exports = router;
