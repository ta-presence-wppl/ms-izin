const express = require('express');
const router = express.Router();

//Define Validasi Auth
const authChecker = require('../services/auth_check');

//Define Controllers
const IzinControllers = require('../controllers/izin');

//Define Root Izin
const routerIn = require('./izin/in');

//Define API /izin/
router.use('/izin', authChecker.checkAuth, (req, res, next) => {
    next();
}, routerIn);

//Sample Route
/**
  * @swagger
  * /:
  *   get:
  *     description: Returns the homepage
  *     responses:
  *       200:
  *         description: hello world
  */
router.get('/', (req, res, next) => {
    res.send({
        message: 'Service Izin',
        url: req.originalUrl
    })
});
//End Sample

router.get('/jenis_izin', (req, res, next) => {
    new IzinControllers().getJenisIzin().then(x => {
        res.json({
            message: 'Sukses GET Jenis Izin',
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

//exports
module.exports = router;