const Translation = require("../models/Translation");
const Summary = require("../models/Summary");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc      Get translations
// @route     GET /api/v1/translations
// @route     GET /api/v1/summaries/:summaryId/translations
// @access    Public
exports.getTranslations = asyncHandler(async (req, res, next) => {
  if (req.params.summaryId) {
    const translations = await Translation.find({ summary: req.params.summaryId });

    return res.status(200).json({
      success: true,
      count: translations.length,
      data: translations,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single translation
// @route     GET /api/v1/translations/:id
// @access    Public
exports.getTranslation = asyncHandler(async (req, res, next) => {
  const translation = await Translation.findById(req.params.id).populate({
    path: "summary",
    select: "title author",
  });

  if (!translation) {
    return next(
      new ErrorResponse(`No translation with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: translation,
  });
});

// @desc      Add translation
// @route     POST /api/v1/summaries/:summaryId/translations
// @access    Private
exports.addTranslation = asyncHandler(async (req, res, next) => {
  req.body.summary = req.params.summaryId;
  req.body.user = req.user.id;

  const summary = await Summary.findById(req.params.summaryId);

  if (!summary) {
    return next(
      new ErrorResponse(`No summary with the id of ${req.params.summaryId}`),
      404
    );
  }

  // Make sure user is summary owner
  if (summary.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a translation to summary ${summary._id}`,
        401
      )
    );
  }

  const translation = await Translation.create(req.body);

  res.status(200).json({
    success: true,
    data: translation,
  });
});

// @desc      Update translation
// @route     PUT /api/v1/translations/:id
// @access    Private
exports.updateTranslation = asyncHandler(async (req, res, next) => {
  let translation = await Translation.findById(req.params.id);

  if (!translation) {
    return next(
      new ErrorResponse(`No translation with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is translation owner
  if (translation.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update translation ${translation._id}`,
        401
      )
    );
  }

  translation = await Translation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: translation,
  });
});

// @desc      Delete translation
// @route     DELETE /api/v1/translations/:id
// @access    Private
exports.deleteTranslation = asyncHandler(async (req, res, next) => {
  const translation = await Translation.findById(req.params.id);

  if (!translation) {
    return next(
      new ErrorResponse(`No translation with the id of ${req.params.id}`),
      404
    );
  }

  // Make sure user is translation owner
  if (translation.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete translation ${translation._id}`,
        401
      )
    );
  }

  await translation.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
