const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, 'Email harus di isi']
    },
    name: {
        type: String,
        require: [true, 'Nama harus di isi'],
        maxLength: [255, 'panjang nama harus antara 3-255 karakter'],
        minLength: [3, 'panjang nama harus antara 3-255 karakter'],
    },
    username: {
        type: String,
        require: [true, 'Username harus di isi'],
        maxLength: [255, 'panjang usernama harus antara 3-255 karakter'],
        minLength: [3, 'panjang usernama harus antara 3-255 karakter'],
    },
    password: {
        type: String,
        require: [true, 'Kata sandi harus di isi'],
        maxLength: [255, 'panjang password harus antara 3-255 karakter'],
        minLength: [8, 'panjang password harus antara 8-255 karakter'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    avatar: {
        type: String,
    },
    fileName: {
        type:String
    },
    phoneNumber: {
        type: String,
        require: [true, 'Nomor telepon harus di isi'],
        maxLength: [13, 'panjang Nomor Telpon harus antara 9-13 karakter'],
        minLength: [9, 'panjang Nomor Telpon harus antara 9-13 karakter'],
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
}, { timestamps: true })

// validate data unique
// value = email yang di kirim
playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({email: value})
        return !count
    } catch (error) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

// sebelum di simpan password akan di hasing
playerSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)