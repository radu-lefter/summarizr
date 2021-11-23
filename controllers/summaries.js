const Summary = require('../models/Summary');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc      Get all summaries
// @route     GET /api/v1/summaries
// @access    Public
exports.getSummaries = asyncHandler(async (req, res, next) => {
  
  let query;
  
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Summary.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Summary.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const summaries = await query;

    // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(200).json({
    success: true,
    count: summaries.length,
    pagination,
    data: summaries
  });
  
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