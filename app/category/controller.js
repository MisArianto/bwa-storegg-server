const Category = require('./model')

module.exports = {
    index:async(req, res) => {
        try {
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus }
            const categories = await Category.find()
            res.render('admin/category/view_category', {
                categories,
                alert,
                name: req.session.user.name,
                title: 'Halaman Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    create: async(req, res) => {
        try {
            res.render('admin/category/create', {
                name: req.session.user.name,
                title: 'Halaman Tambah Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    store: async(req, res) => {
        try {
            const {name} = req.body

            let category = new Category({name})
            await category.save()

            req.flash('alertMessage', 'Berhasil tambah kategori')
            req.flash('alertStatus', 'success')

            res.redirect('/category')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    edit: async(req, res) => {
        try {
            const {id} = req.params

            const category = await Category.findOne({_id: id})

            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Halaman Edit Category'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    update: async(req, res) => {
        try {
            const {id} = req.params
            const {name} = req.body

            const category = await Category.findOneAndUpdate({
                _id: id
            }, {
                name
            })

            req.flash('alertMessage', 'Berhasil update kategori')
            req.flash('alertStatus', 'success')

            res.redirect('/category')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    },
    destroy: async(req, res) => {
        try {
            const {id} = req.params

            const category = await Category.findOneAndRemove({
                _id: id
            })

            req.flash('alertMessage', 'Berhasil delete kategori')
            req.flash('alertStatus', 'success')

            res.redirect('/category')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
        }
    }
}