const express = require('express');
const {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh,
    ChiTieuHangNgayThucte
} = require('../models/ChiTieu');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/chitieuDudinh/create', auth, async (req, res) => {
    console.log('[chitieuDudinh]: ' + JSON.stringify(req.body));
    //console.log('[chitieuDudinh]: ' + JSON.stringify(req.user))
    const {
        month,
        year,
        thunhap,
        chitieuBatbuoc,
        chitieuHangngay
    } = req.body;
    const thoigian = new Thoigian({
        userId: req.user._id,
        year,
        month
    });
    const result = await thoigian.save();
    console.log('[resutl]: ' + result._id);
    const thunhapDb = new Thunhap({
        key: result._id,
        ammount: thunhap.ammount
    });
    await thunhapDb.save();

    const chitieuBatbuocDb = new ChitieuBatbuocDudinh({
        key: result._id,
        totalAmmount: chitieuBatbuoc.totalAmmount,
        entities: chitieuBatbuoc.entities.map(c => {
            return {
                content: c.content,
                ammount: c.ammount,
                ammountNumber: c.ammountNumber
            }
        })
    });
    await chitieuBatbuocDb.save();

    const chitieuHangngayModelDb = [];

    for (let i = 0; i < chitieuHangngay.length; i++) {
        const document = {
            key: result._id,
            date: chitieuHangngay[i].date,
            totalAmmount: chitieuHangngay[i].totalAmmount,
            entities: chitieuHangngay[i].entities.map(c => {
                return {
                    content: c.content,
                    ammount: c.ammount
                }
            })
        }
        chitieuHangngayModelDb.push(document);
    }

    console.log('chitieuHangngayModelDb:' + JSON.stringify(chitieuHangngayModelDb));
    ChiTieuHangNgayDuDinh.insertMany(chitieuHangngayModelDb, (error, docs) => {
        if (error) {
            console.error(error);
        } else {
            console.log('ChiTieuHangNgayDuDinh:=> Insert successfuly');
        }
    })
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