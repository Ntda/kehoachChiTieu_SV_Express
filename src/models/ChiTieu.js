const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const thoigianSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    }
});

const thunhapSchema = mongoose.Schema({
    time: ObjectId,
    ammount: {
        type: String,
        require: true
    }
});

const chitieuBatbuocDudinhSchema = mongoose.Schema({
    time: ObjectId,
    totalAmmount: {
        type: Number,
        require: true
    },
    entities: [{
        content: String,
        ammount: String,
        ammountNumber: {
            type: Number,
            require: true
        }
    }]
});

const actualRequiredAmmountSchema = mongoose.Schema({
    time: ObjectId,
    requiredScheduleId: ObjectId,
    content: String,
    ammount: String,
    ammountNumber: {
        type: Number,
        require: true
    }
});

const chiTieuHangNgayDudinhSchema = mongoose.Schema({
    time: ObjectId,
    day: {
        type: Number,
        require: true
    },
    ammountNumber: Number
});

const ammountRestSchema = mongoose.Schema({
    time: ObjectId,
    ammount: Number
});

const ammountDailySpend = mongoose.Schema({
    time: ObjectId,
    day: {
        type: Number,
        require: true
    },
    ammountDailySpend: String,
    ammountDailySpendNumber: Number,
    content: String
});

const Thoigian = mongoose.model('Thoigian', thoigianSchema);
const Thunhap = mongoose.model('Thunhap', thunhapSchema);
const ChitieuBatbuocDudinh = mongoose.model('ChitieuBatbuocDudinh', chitieuBatbuocDudinhSchema);
const ChiTieuHangNgayDuDinh = mongoose.model('ChiTieuHangNgayDuDinh', chiTieuHangNgayDudinhSchema);
const AmmountRest = mongoose.model('AmmountRest', ammountRestSchema);
const AmmountDailySpend = mongoose.model('AmmountDailySpend', ammountDailySpend);
const ActualRequiredAmmount = mongoose.model('ActualRequiredAmmount', actualRequiredAmmountSchema);

console.log('Test CI/CD');

const thuChi = {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh,
    AmmountRest,
    AmmountDailySpend,
    ActualRequiredAmmount
};

module.exports = thuChi;