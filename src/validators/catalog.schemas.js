const Joi = require('joi');

const catalogQuery = Joi.object({
  includeInactive: Joi.boolean().default(false)
}).unknown(false);

module.exports = { catalogQuery };
