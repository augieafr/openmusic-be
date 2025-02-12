const { successResponse } = require('../../utils/responseHelper');

class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.putAlbumHandlerById = this.putAlbumHandlerById.bind(this);
  }

  async getAlbumsByIdHandler(request) {
    const { id } = request.params;
    const albums = await this._service.getAlbumsById(id);
    return {
      status: 'success',
      data: {
        albums
      }
    };
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const albumId = await this._service.addAlbum(request.payload);
    return successResponse(h, { albumId }, null, 201);
  }

  async putAlbumHandlerById(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);
    return successResponse(h, null, 'Berhasil mengubah album');
  }
}

module.exports = AlbumsHandler;