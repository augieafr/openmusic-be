const generalMapDbToModel = (dbModel) => {
  const { created_at, updated_at, ...otherProperties } = dbModel;
  return {
    ...otherProperties,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

const mapSongDbToModel = (dbModel) => {
  const { id, album_id, ...otherProperties } = dbModel;

  return {
    id,
    albumId: album_id,
    ...generalMapDbToModel(otherProperties),
  };
};

module.exports = { generalMapDbToModel, mapSongDbToModel };
