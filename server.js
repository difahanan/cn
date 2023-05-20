const { Article, customer, sale, sequelize } = require('./models')
// KENAPA PAKAI REQUIRE MODELS LALU NGEBUKA PAKAI OBJECT KARNA DI FILE INDEX.JS YANG DI MODELS DIA PAKAI MODULE EXPORTS DB
// DAN DB DIA OBJECT OBJECT KAN BAKAL DI INSERT2
// DATA CUSTOMER ITU DIA DISIMPAN DI MODELS JADI DIA DIPANGGIL LETAKKAN DI SAMPING ARTICLE
// PANGGIL MODULE-MODULE YANG DIPERLUKAN BUAT BIKIN SERVER
// PANGGIL EXPERESS NYA
const express = require('express')

// BIKIN SERVER
const app = express()
// KALAU PINGIN NAMBAHIN VIEW ENGINE 
app.set('view engine', 'ejs')
// KALAU DI EJS INI NORMAL NYA DIA UNTUK VIEW ENGINE BAKAL DIA BAKAL NGELIHAT FILE2 HTML NYA DI FOLDER VIEWS CUMA BISA DISETTING AGAR DIA NGAMBIL NYA GAK DARI FOLDER VIEWS DARI FOLDER LAIN BISA.

// PINGIN NGAMBIL NILAI DARI BODY CUSTOMER/ADD JADI HARUS PAKAI MIDDLEWARE
app.use(express.urlencoded({ extended: true }))

// BUAT API YANG KALAU DI HIT DIA BAKAL MENGCREATE ARTICLE
// COBA AMBIL DATA DARI DATABASE DAN MASUKIN KE DALAM LAYOUT/ TABLE yang di index.js
// BUAT ERROR HANDLING
app.get('/', async function (req, res) {
    try {
        // AMBIL DATA CUSTOMER DI DB
        // PANGGIL DATA CUSTOMER NYA. SIMPAN DULU DATA NYA DI 1 VARIABEL 
        let customerData = await customer.findAll()
        customerData = customerData.map(function (data) {
            return data.toJSON()
        })
        // MAPPING DATA DARI DATABASE MENJADI STRING UNTUK FE NYA
        let customerDataString = '';
        customerData.forEach(function (data, index) {
            customerDataString += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${data.customerName}</td>
                <td>
                    <button type="button" class="btn btn-primary">Update</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger">Delete</button>
                </td>
            </tr>
            `
        })
        // TAMPILKAN HALAMAN
        res.render('index', { customer: customerDataString })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error!')
    }
})

// BUAT NAMBAH HALAMAN NGAMBIL TAMBAH DATA
app.get('/customer/add', function (req,res) {
    res.render('customer_add')
})

// BUAT API BARU UNTUK MASIH SAMA2 KE CUSTOMER ADD TAPI SEKARANG METHOD NYA POST
app.post('/customer/add', async function (req,res) {
    const transaction = await sequelize.transaction()
    try{
        // AMBIL DATA DARI BODY
        const { customerName, city, country, ...sisa } = req.body
        // SIMPAN DATA KE DATABASE 
        const customerData = await customer.create({ customerName, city, country }, { transaction })
        await sale.create({ ...sisa, customerId: customerData.id }, { transaction })
        await transaction.commit()
        // JIKA BERHASIL REDICT KE HALAMAN UTAMA
        res.redirect('/')
    } catch(error) {
        await transaction.rollback()
        console.log('error')
        res.status(500).send('Internal Server Error ! ')
    }
})


// BIKIN 1 HALAMAN. CASE NYA PINGIN NAMBAHIN SUATU TABLE. SUATU HALAMAN YANG DIMANA NANTI AKAN MENAMPILKAN LIST-LIST CUSTOMER. JADI BIKIN 1 HALAMAN BIKINNYA DENGAN MENGGUNAKAN VIEW ENGINE. JADI BAKAL NGE INSTALL EJS.

// BUAT RUNNING SERVER NYA
// LALU BIKIN 1 FUNCTION BUAT MENGINDIKASIKAN APAKAH SERVER UDAH JALAN ATAU BELUM
app.listen(process.env.PORT, function () {
    console.log(`Server berjalan di PORT ${process.env.PORT}`)
})