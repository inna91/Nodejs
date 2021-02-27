const mongoose = require('mongoose');

function validateId(req, _res, next) {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: `${contactId} is not valid`,
    });
  }
  next();
}

module.exports = validateId;
