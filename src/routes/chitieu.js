const express = require('express');
const {
    Thoigian,
    Thunhap,
    ChitieuThang,
    ChiTieuHangNgayDuDinh,
    ChiTieuHangNgayThucte
} = require('../models/ChiTieu');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/chitieu', async (req, res) => {
    
});

router.get('/chitieu/:day/:month/:year', async (req, res) => {
    const {
        day, month, year
    } = req.params;
    console.log('[/chitieu/:day/:month/:year]:' + day)
    const chitieuInfo = await ChiTieu.findChiTieuByDate(day, month, year);
    return res.status(200).json(chitieuInfo);
});

module.exports = router;