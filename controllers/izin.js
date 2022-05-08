const { Op, Model, QueryTypes, DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_CONN);
const initModels = require('../models/init-models');
var models = initModels(sequelize);

class IzinControllers {
    // getJenisIzin() {
    //     return models.izin.findAll({
    //         include: {
    //           model: models.jenis_izin,
    //           as: 'jenis_jenis_izin' 
    //         }
    //     })
    // }

    getJenisIzin() {
        return models.jenis_izin.findAll()
    }

    checkIzinIn(data) {
        return models.izin.findOne({
            attributes: {
                include: ['id_peg']
            },
            where: {
                id_peg: data.id_peg,
                tgl_awal: data.tgl_awal
            },
        })
    }

    createIzinIn(data) {
        return models.izin.create({
            id_peg: data.id_peg,
            tgl_awal: data.tgl_awal,
            tgl_akhir: data.tgl_akhir,
            ket: data.ket,
            jenis: data.jenis,
            foto: data.foto,
            id_atasan: data.id_atasan
        })
    }

    checkHistoryIzin(data) {
        return models.izin.findAll({
            attributes: {
                exclude: ['id_peg']
            },
            where: {
                id_peg: data.id_peg,
                tgl_awal: sequelize.literal("EXTRACT(year FROM tgl_awal) = EXTRACT(year FROM date('" + data.date + "')) and EXTRACT(month FROM tgl_awal) = EXTRACT(month FROM date('" + data.date + "'))")
            },
        })
    }
}

module.exports = IzinControllers;