const Summary = require('../models/Summary');

// @desc      Get all summaries
// @route     GET /api/v1/summaries
// @access    Public
exports.getSummaries = async (req, res, next) => {
  try {
    const summaries = await Summary.find();

    res
      .status(200)
      .json({ success: true, count: summaries.length, data: summaries });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
  
  // @desc      Get single summary
  // @route     GET /api/v1/summaries/:id
  // @access    Public
  exports.getSummary = async (req, res, next) => {
    try {
      const summary = await Summary.findById(req.params.id);
  
      if (!summary) {
        return res.status(400).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: summary });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };
  
  // @desc      Create new summary
  // @route     POST /api/v1/summaries
  // @access    Private
  exports.createSummary = async (req, res, next) => {
    try {
      const summary = await Summary.create(req.body);
  
      res.status(201).json({
        success: true,
        data: summary
      });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };
  
  // @desc      Update summary
  // @route     PUT /api/v1/summaries/:id
  // @access    Private
  exports.updateSummary = async (req, res, next) => {
    try {
      const summary = await Summary.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
  
      if (!summary) {
        return res.status(400).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: summary });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };
  
  // @desc      Delete summary
  // @route     DELETE /api/v1/summaries/:id
  // @access    Private
  exports.deleteSummary = async (req, res, next) => {
    try {
      const summary = await Summary.findByIdAndDelete(req.params.id);
  
      if (!summary) {
        return res.status(400).json({ success: false });
      }
  
      res.status(200).json({ success: true, data: {} });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  };