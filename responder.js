function respond(res, statusCode, out) {
  return res.status(statusCode).json(out)
}

module.exports = {
  withSuccess(res, data=[], msg='Success', statusCode=200) {
    const obj = {
      message: msg,
      data,
      error: []
    }
    return respond(res, statusCode, obj)
  },

  withValidationError(res, error=[], msg='Validation Error', statusCode=422) {
    const obj = {
      message: msg,
      data: [],
      error
    }
    return respond(res, statusCode, obj)
  }
}