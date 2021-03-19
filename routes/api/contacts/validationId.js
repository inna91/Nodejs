const mongoose = require('mongoose');

function validateId(req, _res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: `${id} is not valid`,
    });
  }
  next();
}

module.exports = validateId;
