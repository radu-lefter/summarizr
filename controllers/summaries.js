const Summary = require('../models/Summary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all summaries
// @route     GET /api/v1/summaries
// @access    Public
exports.getSummaries = asyncHandler(async (req, res, next) => {
 
  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = Summary.find(JSON.parse(queryStr));

  const summaries = await query;

    res
      .status(200)
      .json({ success: true, count: summaries.length, data: summaries });
  
});
  
  // @desc      Get single summary
  // @route     GET /api/v1/summaries/:id
  // @access    Public
  exports.getSummary = asyncHandler(async (req, res, next) => {

      const summary = await Summary.findById(req.params.id);
  
      if (!summary) {
        return next(
          new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
        );
      }
  
      res.status(200).json({ success: true, data: summary });

  });
  
  // @desc      Create new summary
  // @route     POST /api/v1/summaries
  // @access    Private
  exports.createSummary = asyncHandler(async (req, res, next) => {

      const summary = await Summary.create(req.body);
  
      res.status(201).json({
        success: true,
        data: summary
      });
 
  });
  
  // @desc      Update summary
  // @route     PUT /api/v1/summaries/:id
  // @access    Private
  exports.updateSummary = asyncHandler(async (req, res, next) => {

      const summary = await Summary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!summary) {
        return next(
          new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
        );
      };
  
      res.status(200).json({ success: true, data: summary });

  });
  
  // @desc      Delete summary
  // @route     DELETE /api/v1/summaries/:id
  // @access    Private
  exports.deleteSummary = asyncHandler(async (req, res, next) => {

      const summary = await Summary.findByIdAndDelete(req.params.id);
  
      if (!summary) {
        return next(
          new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
        );
      }
  
      res.status(200).json({ success: true, data: {} });

  });