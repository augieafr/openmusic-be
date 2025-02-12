const { SongPayloadSchema } = require('./schema');

const SongValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  }
}

module.exports = SongValidator;