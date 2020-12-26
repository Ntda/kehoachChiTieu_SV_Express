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

const chiTieuHangNgayDudinhSchema = mongoose.Schema({
    time: ObjectId,
    day: {
        type: Number,
        require: true
    },
    ammountNumber: Number,
});

const ammountRestSchema = mongoose.Schema({
    time: ObjectId,
    ammount: Number
})
/* const chiTieuHangNgayThucTeSchema = mongoose.Schema({
    key: String,
    ngay: {
        type: String,
        required: true
    },
    sotien: {
        type: Number,
        required: true
    },
    tieude: {
        type: String
    },
    noidung: {
        type: String
    }
}); */


const Thoigian = mongoose.model('Thoigian', thoigianSchema);
const Thunhap = mongoose.model('Thunhap', thunhapSchema);
const ChitieuBatbuocDudinh = mongoose.model('ChitieuBatbuocDudinh', chitieuBatbuocDudinhSchema);
const ChiTieuHangNgayDuDinh = mongoose.model('ChiTieuHangNgayDuDinh', chiTieuHangNgayDudinhSchema);
const AmmountRest = mongoose.model('AmmountRest', ammountRestSchema);
//const ChiTieuHangNgayThucte = mongoose.model('ChiTieuHangNgayThucte', chiTieuHangNgayThucTeSchema);

const thuChi = {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh,
    AmmountRest
};

module.exports = thuChi;