const express = require('express');
const router = express.Router();
var fs = require('fs');

//Define Async
const async = require('async');

//Panggil Path Node
const path = require('path');

//Define Controllers
const IzinControllers = require('../../controllers/izin');

//Define Validator Body
const validator = require('./authValidator');

//Define Multer Untuk File Upload
const multer = require('multer');

//Moment JS
var moment = require('moment');

//Define Multer Images Folder
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'images/izin',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-izin-' + Date.now()
            + path.extname(file.originalname))
        // file.fieldname is name of the field (image)
        // path.extname get the uploaded file extension
    }
});

//Define Image Upload
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

//Sample Route
/**
 * @swagger
 * /auth:
 *   post:
 *     description: Auth User
 *     responses:
 *       200:
 *          description: Returns one User Specified.
 *          data: Some data user
 *          token: Return token to Verified User
 *     body:
 *          - email
 *          - password
 */
router.get('/', validator.validate("check_history"), validator.verify, (req, res, next) => {
    var myDate = {
        id_peg: req.user_data.id_peg,
        date: req.query.date
    }
    new IzinControllers().checkHistoryIzin(myDate).then(x => {
        for (const [key, value] of Object.entries(x)) {
            value['foto'] = value.foto != null ? 'https://api-ta-presence-gateaway.behindrailstudio.com/storage/ms-izin/images/izin/' + value.foto : null;
        }
        res.json({
            message: 'Sukses Get History Izin',
            data: x
        })
    }).catch(err => {
        var details = {
            parent: err.parent,
            name: err.name,
            message: err.message
        }
        var error = new Error("Error pada server");
        error.status = 500;
        error.data = {
            date: new Date(),
            route: req.originalUrl,
            details: details
        };
        next(error);
    });
});

router.post('/', imageUpload.single('image'), (req, res, next) => {
    var myDate = {
        id_peg: req.user_data.id_peg,
        jenis: req.body.jenis_izin,
        ket: req.body.ket,
        tgl_awal: req.body.tgl_awal,
        tgl_akhir: req.body.tgl_akhir,
        foto: req.file.filename,
        id_atasan: req.user_data.id_atasan
    }
    try {
        async.waterfall([
            (callback) => {
                new IzinControllers().checkIzinIn(myDate).then(x => {
                    if (x) {
                        try {
                            fs.unlink(path.join(__dirname + '../../../images/izin/') + req.file.filename, function () {
                                res.status(406).send({
                                    message: 'Anda Sudah Melakukan Pengajuan Izin!'
                                })
                            });
                        } catch (error) {
                            console.error(error)
                            next(error)
                        }
                    } else {
                        callback(null, x);
                    }
                }).catch(err => {
                    var details = {
                        parent: err.parent,
                        name: err.name,
                        message: err.message
                    }
                    var error = new Error("Error pada server");
                    error.status = 500;
                    error.data = {
                        date: new Date(),
                        route: req.originalUrl,
                        details: details
                    };
                    next(error);
                });
            },
            (checkAbsent, callback) => {
                new IzinControllers().createIzinIn(myDate).then(x => {
                    res.send({
                        message: 'Sukses POST Izin IN'
                    })
                }).catch(err => {
                    var details = {
                        parent: err.parent,
                        name: err.name,
                        message: err.message
                    }
                    var error = new Error("Error pada server");
                    error.status = 500;
                    error.data = {
                        date: new Date(),
                        route: req.originalUrl,
                        details: details
                    };
                    next(error);
                });
            }
        ]);
    } catch (error) {
        console.error(error)
        next(error)
    }
}, (error, req, res, next) => {
    console.error(error)
    next(error)
});

//exports
module.exports = router;