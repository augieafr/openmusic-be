/**
 * Creates a success response with Hapi.js response toolkit
 * @param {Hapi.ResponseToolkit} h - The Hapi response toolkit
 * @param {*} data - The data to be included in the response
 * @param {string} message - Success message to be included in the response
 * @param {number} [statusCode=200] - HTTP status code (default: 200)
 * @returns {Hapi.ResponseObject} Response object with specified status code
 */
const successResponse = (h, data, message, statusCode = 200) => {
  const response = {
    status: 'success',
    data: data,
  };
  if (message) {
    response.message = message;
  }

  return h.response(response).code(statusCode);
};

module.exports = { successResponse };
