const Transaksi = require('./model')

module.exports = {
    index: async(req, res) => {
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = { message: alertMessage, status: alertStatus }

            const transaksis = await Transaksi.find().populate('player')

            res.render('admin/transaksi', {
                transaksis,
                alert,
                name: req.session.user.name,
                title: 'Halaman Transaksi'
            })
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/transaksi')
        }
    },
    updateStatus: async (req, res) => {
        try {
            const {id} = req.params
            const {status} = req.query

            await Transaksi.findOneAndUpdate({
                _id: id
            }, {
                status
            })

            req.flash('alertMessage', 'Status berhasil di rubah')
            req.flash('alertStatus', 'success')

            res.redirect('/transaksi')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/transaksi')
        }
    }
}