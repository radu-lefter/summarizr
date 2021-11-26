const Summary = require("../models/Summary");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const path = require("path");

// @desc      Get all summaries
// @route     GET /api/v1/summaries
// @access    Public
exports.getSummaries = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published summary
  const publishedSummary = await Summary.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one summary
  if (publishedSummary && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a summary`,
        400
      )
    );
  }

  const summary = await Summary.create(req.body);

  res.status(201).json({
    success: true,
    data: summary,
  });
});

// @desc      Update summary
// @route     PUT /api/v1/summaries/:id
// @access    Private
exports.updateSummary = asyncHandler(async (req, res, next) => {
  let summary = await Summary.findById(req.params.id);

  if (!summary) {
    return next(
      new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is summary owner
  if (summary.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this summary`,
        401
      )
    );
  }

  summary = await Summary.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: summary });
});

// @desc      Delete summary
// @route     DELETE /api/v1/summaries/:id
// @access    Private
exports.deleteSummary = asyncHandler(async (req, res, next) => {
  const summary = await Summary.findById(req.params.id);

  if (!summary) {
    return next(
      new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is summary owner
  if (summary.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this summary`,
        401
      )
    );
  }

  summary.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Upload photo for summary
// @route     PUT /api/v1/summarys/:id/photo
// @access    Private
exports.summaryPhotoUpload = asyncHandler(async (req, res, next) => {
  const summary = await Summary.findById(req.params.id);

  if (!summary) {
    return next(
      new ErrorResponse(`Summary not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${summary._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Summary.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
