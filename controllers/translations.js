const Translation = require('../models/Translation');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get translations
// @route     GET /api/v1/translations
// @route     GET /api/v1/summaries/:summaryId/translations
// @access    Public
exports.getTranslations = asyncHandler(async (req, res, next) => {
    let query;
  
    if (req.params.summaryId) {
      query = Translation.find({ summary: req.params.summaryId });
    } else {
      query = Translation.find().populate({
        path: 'summary',
        select: 'title author'
      });
    }
  
    const translations = await query;
  
    res.status(200).json({
      success: true,
      count: translations.length,
      data: translations
    });
  });