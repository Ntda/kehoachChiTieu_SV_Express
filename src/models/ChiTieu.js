const mongoose = require('mongoose');

const thuChiSchema = mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    thunhap: {
        type: Number,
        required: true
    },
    chitieu: {
        tietKiem: {
            type: Number,
            required: true
        },
        chiTieuBatBuoc: {
            type: Number,
            required: true
        },
        chiTieuHangNgayDuDinh: [{
            day: {
                type: String,
                required: true
            },
            sotien: {
                type: Number,
                required: true
            }
        }],
        chiTieuHangNgayThucTe: [{
            day: {
                type: String,
                required: true
            },
            sotien: {
                type: Number
            }
        }]
    }
});

thuChiSchema.statics.findChiTieuByDate = async function (date, month, year) {
    const chiTieu = await this.findOne({
        year,
        month
    });
    return chiTieu;
}



const Chitieu = mongoose.model('Chitieu', thuChiSchema);
module.exports = Chitieu;