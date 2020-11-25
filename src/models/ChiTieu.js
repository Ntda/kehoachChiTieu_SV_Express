const mongoose = require('mongoose');

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
    key: String,
    sotien: Number,
    required: true
});

const chitieuThangSchema = mongoose.Schema({
    key: String,
    tienTietKiem: Number,
    chiTieuBatBuoc: Number
});

const chiTieuHangNgayDuDinhSchema = mongoose.Schema({
    key: String,
    ngay: {
        type: String,
        required: true
    },
    sotien: {
        type: Number,
        required: true
    }
});

const chiTieuHangNgayThucTeSchema = mongoose.Schema({
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
});



const Thoigian = mongoose.model('Thoigian', thoigianSchema);
const Thunhap = mongoose.model('Thunhap', thunhapSchema);
const ChitieuThang = mongoose.model('ChitieuThang', chitieuThangSchema);
const ChiTieuHangNgayDuDinh = mongoose.model('ChiTieuHangNgayDuDinh', chiTieuHangNgayDuDinhSchema);
const ChiTieuHangNgayThucte = mongoose.model('ChiTieuHangNgayThucte', chiTieuHangNgayThucTeSchema);

const thuChi = {
    Thoigian,
    Thunhap,
    ChitieuThang,
    ChiTieuHangNgayDuDinh,
    ChiTieuHangNgayThucte
};

module.exports = thuChi;