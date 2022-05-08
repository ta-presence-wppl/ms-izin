var DataTypes = require("sequelize").DataTypes;
var _izin = require("./izin");
var _jabatan = require("./jabatan");
var _jenis_izin = require("./jenis_izin");
var _pegawai = require("./pegawai");
var _presensi = require("./presensi");

function initModels(sequelize) {
  var izin = _izin(sequelize, DataTypes);
  var jabatan = _jabatan(sequelize, DataTypes);
  var jenis_izin = _jenis_izin(sequelize, DataTypes);
  var pegawai = _pegawai(sequelize, DataTypes);
  var presensi = _presensi(sequelize, DataTypes);


  jabatan.belongsTo(pegawai, { foreignKey: "id_atasan" });
  pegawai.hasMany(jabatan, { foreignKey: "id_atasan" });

  pegawai.belongsTo(jabatan, { foreignKey: "kode_jabatan" });
  jabatan.hasMany(pegawai, { foreignKey: "kode_jabatan" });

  presensi.belongsTo(pegawai, { foreignKey: "id_peg" });
  pegawai.hasMany(presensi, { foreignKey: "id_peg" });

  izin.belongsTo(pegawai, { foreignKey: "id_atasan" });
  pegawai.hasMany(izin, { foreignKey: "id_atasan" });
  
  izin.belongsTo(pegawai, { foreignKey: "id_peg" });
  pegawai.hasMany(izin, { foreignKey: "id_peg" });

  izin.belongsTo(jenis_izin, { as: "jenis_jenis_izin", foreignKey: "jenis"});
  jenis_izin.hasMany(izin, { as: "izins", foreignKey: "jenis"});

  return {
    izin,
    jabatan,
    jenis_izin,
    pegawai,
    presensi,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
