const express = require('express');
const ChiTieu = require('../models/ChiTieu');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/chitieu', async (req, res) => {
    console.log('/chitieu');
    const chitieuModel = {
        year: '2020',
        month: '11',
        thunhap: 1000000,
        chitieu: {
            tietKiem: 500000,
            chiTieuBatBuoc: 300000,
            chiTieuHangNgayDuDinh: [{
                day: 1,
                sotien: 10000
            }],
            chiTieuHangNgayThucTe: [{
                day: 1,
                sotien: 20000
            }]
        }
    };
    const chitieu = new ChiTieu(chitieuModel);
    await chitieu.save();
    return res.status(200).json(chitieu);
});

router.get('/chitieu/:day/:month/:year', async (req, res) => {
    const {
        day, month, year
    } = req.params;
    console.log('[/chitieu/:day/:month/:year]:'+ day)
    const chitieuInfo = await ChiTieu.findChiTieuByDate(day, month, year);
    return res.status(200).json(chitieuInfo);
});

module.exports = router;