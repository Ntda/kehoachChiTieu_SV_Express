const express = require('express');
const {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh,
    AmmountRest,
    AmmountDailySpend,
    ActualRequiredAmmount
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
});

router.get('/chitieuThucte/getChitieuByDate', auth, async (req, res) => {
    const {
        day,
        month,
        year
    } = req.query;
    const timeSelected = await Thoigian.findOne({ month, year });
    if (!timeSelected) {
        return res.status(200).json({ ammount: 0 });
    }

    const ammountDailySpend = await AmmountDailySpend.find({
        time: timeSelected._id,
        day
    });

    let totalAmmountSpend = 0;

    if (ammountDailySpend) {
        ammountDailySpend.forEach(spend => {
            totalAmmountSpend += spend.ammountDailySpendNumber
        });
    }

    const ammount = await ChiTieuHangNgayDuDinh.findOne({
        time: timeSelected._id,
        day
    });

    const detailAmmountDailySpend = await AmmountDailySpend.find({
        time: timeSelected._id,
        day
    });

    const responseDataJson = JSON.stringify({
        ammount: ammount
            ? ammount.ammountNumber - totalAmmountSpend
            : 0,
        totalAmmount: ammount.ammountNumber,
        detailAmmountDailySpend
    });

    //console.log('responseDataJson result: ' + responseDataJson);

    return res.status(200).json(responseDataJson);
});

router.post('/chitieuThucte/createChitieuByDate', auth, async (req, res) => {
    const {
        month,
        year,
        day,
        ammountDailySpend,
        ammountDailySpendNumber,
        content
    } = req.body;
    console.debug(req.body);
    const timeSelected = await Thoigian.findOne({ month, year });
    const ammountDailySpendDb = new AmmountDailySpend({
        time: timeSelected._id,
        day,
        ammountDailySpend,
        ammountDailySpendNumber,
        content
    });
    await ammountDailySpendDb.save();
    return res.status(200).json({ message: 'Create new ammount daily spend successs' });
});

router.get('/chitieuThucte/getChitieuBatbuocByMonthAndYear', auth, async (req, res) => {
    const { month, year } = req.query;
    const timeSelected = await Thoigian.findOne({ month, year });
    const actualSchedulePromise = ChitieuBatbuocDudinh.findOne({
        time: timeSelected._id
    });

    const actualRequiredPromise = ActualRequiredAmmount.find({
        time: timeSelected._id
    });

    const [actualScheduleAmmount,
        actualRequiredAmmount
    ] = await Promise.all([actualSchedulePromise, actualRequiredPromise]);

    return res.status(200).json(JSON.stringify({
        actualScheduleAmmount,
        actualRequiredAmmount
    }));
});

router.post('/chitieuThucte/createChitieuBatbuoc', auth, async (req, res) => {
    const {
        month,
        year,
        entities
    } = req.body;
    const timeSelected = await Thoigian.findOne({ month, year });
    entities.forEach(async entity => {
        const {
            _id,
            content,
            ammount,
            ammountNumber
        } = entity;
        const condition = {
            time: timeSelected,
            requiredScheduleId: _id
        };
        const update = {
            content,
            ammount,
            ammountNumber
        };
        const option = {
            upsert: true
        };
        await ActualRequiredAmmount.findOneAndUpdate(
            condition,
            update,
            option
        )
    });
    return res.status(200).json({ message: 'OK' })
});

module.exports = router;