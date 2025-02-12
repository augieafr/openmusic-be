const ServerError = require("../exceptions/server/ServerError");

/**
 * Execute database query with error handling
 * @param {Pool} pool - PostgreSQL connection pool
 * @param {Object} query - Query object containing text and values
 * @returns {Promise<QueryResult>} Database query result
 * @throws {ServerError} When database query fails
 */
const executeQuery = async (pool, query) => {
  return pool.query(query)
    .catch(() => {
      throw new ServerError('Terjadi kesalahan pada server')
    });
};

module.exports = { executeQuery };