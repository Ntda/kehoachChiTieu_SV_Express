const express = require('express');
const {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh,
    AmmountRest
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
        chitieuHangngay,
        ammountRest
    } = req.body;

    const thoigian = new Thoigian({
        userId: req.user._id,
        year,
        month
    });
    const result = await thoigian.save();

    //console.log('[resutl]: ' + result._id);

    const thunhapDb = new Thunhap({
        time: result._id,
        ammount: thunhap.ammount
    });

    const chitieuBatbuocDb = new ChitieuBatbuocDudinh({
        time: result._id,
        totalAmmount: chitieuBatbuoc.totalAmmount,
        entities: chitieuBatbuoc.entities.map(c => {
            return {
                content: c.content,
                ammount: c.ammount,
                ammountNumber: c.ammountNumber
            }
        })
    });

    const chitieuHangngayModelDb = [];

    const { detail } = chitieuHangngay;
    for (let i = 0; i < detail.length; i++) {
        const document = {
            time: result._id,
            day: detail[i].day,
            ammountNumber: detail[i].ammountNumber,
        }
        chitieuHangngayModelDb.push(document);
    }

    const ammountRestDb = new AmmountRest({
        time: result._id,
        ammount: ammountRest
    });

    await Promise.all([
        thunhapDb.save(),
        chitieuBatbuocDb.save(),
        ChiTieuHangNgayDuDinh.insertMany(chitieuHangngayModelDb),
        ammountRestDb.save()
    ]);

    return res.status(200).json('Create schedule spend money success');
});

router.get('/chitieu/:day/:month/:year', async (req, res) => {
    const {
        day, month, year
    } = req.params;
    console.log('[/chitieu/:day/:month/:year]:' + day)
    const chitieuInfo = await ChiTieu.findChiTieuByDate(day, month, year);
    return res.status(200).json(chitieuInfo);
});

router.get('/chitieuDudinh/get', auth, async (req, res) => {
    const { year, month } = req.query;
    const timeSelected = await Thoigian.findOne({ month, year });
    if (!timeSelected) {
        return res.status(200).json(JSON.stringify({
            moneyIncome: {
                ammount: null
            },
            ammountRequiredSpend: {
                totalAmmount: null,
                entities: []
            },
            ammountRest: {
                ammount: null
            },
            ammountDailySpend: []
        }));
    }
    if (timeSelected) {
        const time = timeSelected._id;

        const [
            moneyIncome,
            ammountRequiredSpend,
            ammountDailySpend,
            ammountRest
        ] = await Promise.all([
            Thunhap.findOne({ time }),
            ChitieuBatbuocDudinh.findOne({ time }),
            ChiTieuHangNgayDuDinh.find({ time }),
            AmmountRest.findOne({ time })
        ]);
        return res.status(200).json(JSON.stringify({
            moneyIncome,
            ammountRequiredSpend,
            ammountDailySpend,
            ammountRest
        }));
    }
});

module.exports = router;