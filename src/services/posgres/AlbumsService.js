const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const { executeQuery } = require('../../utils/dbHelper');
const InvariantError = require('../../exceptions/client/InvariantError');
const { generalMapDbToModel } = require('../../utils/mapper');
const NotFoundError = require('../../exceptions/client/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await executeQuery(this._pool, query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumsById(id) {
    const getAllAlbumsQuery = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const albums = await executeQuery(this._pool, getAllAlbumsQuery);
    if (!albums.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    const getSongsByAlbumIdQuery = {
      text: 'SELECT id, title, performer from SONGS WHERE album_id = $1',
      values: [id],
    };
    const songs = await executeQuery(this._pool, getSongsByAlbumIdQuery);

    return {
      ...albums.rows.map(generalMapDbToModel)[0],
      songs: songs.rows,
    };
  }

  async editAlbumById(id, { name, year }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updatedAt, id],
    };

    const result = await executeQuery(this._pool, query);

    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    console.log('id', id);
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await (executeQuery(this._pool, query));

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
