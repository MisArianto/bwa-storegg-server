const Nominal = require('./model')

module.exports = {
    index: async(req, res) => {
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = { message: alertMessage, status: alertStatus }

            const nominals = await Nominal.find()

            res.render('admin/nominal', {
                nominals,
                alert,
                name: req.session.user.name,
                title: 'Halaman Nominal'
            })
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    create: async(req, res) => {
        try {
            res.render('admin/nominal/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Nominal'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    store: async(req, res) => {
        try {
            const {coinName, coinQuantity, price} = req.body

            let nominal = new Nominal({coinName, coinQuantity, price})
            await nominal.save()

            req.flash('alertMessage', 'Berhasil tambah nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    edit: async(req, res) => {
        try {
            const {id} = req.params

            const nominal = await Nominal.findOne({_id: id})

            res.render('admin/nominal/edit', {
                nominal,
                name: req.session.user.name,
                title: 'Halaman Edit Nominal'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    update: async(req, res) => {
        try {
            const {id} = req.params
            const {coinName, coinQuantity, price} = req.body

            const nominal = await Nominal.findOneAndUpdate({
                _id: id
            }, {
                coinName,
                coinQuantity,
                price
            })

            req.flash('alertMessage', 'Berhasil update nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    },
    destroy: async(req, res) => {
        try {
            const {id} = req.params

            const nominal = await Nominal.findOneAndRemove({
                _id: id
            })

            req.flash('alertMessage', 'Berhasil delete nominal')
            req.flash('alertStatus', 'success')

            res.redirect('/nominal')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/nominal')
        }
    }
}