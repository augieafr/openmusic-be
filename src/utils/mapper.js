const generalMapDbToModel = (dbModel) => {
  const { created_at, updated_at, ...otherProperties } = dbModel;
  return {
    ...otherProperties,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

const mapAlbumDbToModel = (dbModel) => {
  const { id, album_id, ...otherProperties } = dbModel;

  return {
    id,
    album_id,
    ...generalMapDbToModel(otherProperties),
  };
};

module.exports = { generalMapDbToModel, mapAlbumDbToModel }