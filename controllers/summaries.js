// @desc      Get all summaries
// @route     GET /api/v1/summaries
// @access    Public
exports.getSummaries = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all summaries' });
  };
  
  // @desc      Get single summary
  // @route     GET /api/v1/summaries/:id
  // @access    Public
  exports.getSummary = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Show summary ${req.params.id}` });
  };
  
  // @desc      Create new summary
  // @route     POST /api/v1/summaries
  // @access    Private
  exports.createSummary = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new summary' });
  };
  
  // @desc      Update summary
  // @route     PUT /api/v1/summaries/:id
  // @access    Private
  exports.updateSummary = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Update summary ${req.params.id}` });
  };
  
  // @desc      Delete summary
  // @route     DELETE /api/v1/summaries/:id
  // @access    Private
  exports.deleteSummary = (req, res, next) => {
    res
      .status(200)
      .json({ success: true, msg: `Delete summary ${req.params.id}` });
  };