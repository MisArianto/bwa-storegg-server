const Transaksi = require('../transaksi/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Category = require('../category/model')
module.exports = {
    index:async(req, res) => {
        try {
            const transaksi = await Transaksi.countDocuments()
            const voucher = await Voucher.countDocuments()
            const player = await Player.countDocuments()
            const category = await Category.countDocuments()
            res.render('admin/dashboard', {
                name: req.session.user.name,
                title: 'Halaman Dashboard',
                count: {
                    transaksi,
                    voucher,
                    player,
                    category
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
}