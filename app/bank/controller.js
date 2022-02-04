const Bank = require('./model')

module.exports = {
    index: async(req, res) => {
        try {

            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')

            const alert = { message: alertMessage, status: alertStatus }

            const banks = await Bank.find()

            res.render('admin/bank', {
                banks,
                alert,
                name: req.session.user.name,
                title: 'Halaman Bank'
            })
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    create: async(req, res) => {
        try {

            res.render('admin/bank/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    store: async(req, res) => {
        try {

            const {name, nameBank, noRekening} = req.body
            const bank = new Bank({name, nameBank, noRekening})
            await bank.save()

            req.flash('alertMessage', 'Berhasil tambah bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')
            
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    edit: async(req, res) => {
        try {
            const {id} = req.params

            const bank = await Bank.findOne({_id: id})

            res.render('admin/bank/edit', {
                bank,
                name: req.session.user.name,
                title: 'Halaman Edit Bank'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    update: async(req, res) => {
        try {
            const {id} = req.params
            const {name, nameBank, noRekening} = req.body

            await Bank.findOneAndUpdate({
                _id: id
            }, {
                name,
                nameBank,
                noRekening
            })

            req.flash('alertMessage', 'Berhasil update bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    },
    destroy: async(req, res) => {
        try {
            const {id} = req.params

            const bank = await Bank.findOneAndRemove({
                _id: id
            })

            req.flash('alertMessage', 'Berhasil delete bank')
            req.flash('alertStatus', 'success')

            res.redirect('/bank')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
        }
    }
}