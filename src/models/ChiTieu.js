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
    key: ObjectId,
    ammount: {
        type: String,
        require: true
    }
});

const chitieuBatbuocDudinhSchema = mongoose.Schema({
    key: ObjectId,
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
    key: ObjectId,
    date: {
        type: String,
        require: true
    },
    totalAmmount: Number,
    entities: [{
        ammount: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        }
    }]
});

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
//const ChiTieuHangNgayThucte = mongoose.model('ChiTieuHangNgayThucte', chiTieuHangNgayThucTeSchema);

const thuChi = {
    Thoigian,
    Thunhap,
    ChitieuBatbuocDudinh,
    ChiTieuHangNgayDuDinh
};

module.exports = thuChi;