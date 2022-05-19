const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('izin', {
    id_izin: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_peg: {
      type: DataTypes.UUID,
      allowNull: false
    },
    jenis: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'IZIN'
      // type: DataTypes.BIGINT,
      // allowNull: false,
      // defaultValue: 0,
      // references: {
      //   model: 'jenis_izin',
      //   key: 'jenis_izin_id'
      // }
    },
    ket: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    tgl_awal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    tgl_akhir: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    jml_hari: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    id_atasan: {
      type: DataTypes.CHAR(9),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'izin',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "izin_pkey",
        unique: true,
        fields: [
          { name: "id_izin" },
        ]
      },
    ]
  });
};
