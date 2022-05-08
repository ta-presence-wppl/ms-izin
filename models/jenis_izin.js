const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jenis_izin', {
    jenis_izin_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    jenis_izin: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'jenis_izin',
    schema: 'ref',
    timestamps: false,
    indexes: [
      {
        name: "jenis_izin_pkey",
        unique: true,
        fields: [
          { name: "jenis_izin_id" },
        ]
      },
    ]
  });
};
