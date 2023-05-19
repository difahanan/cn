// PANGGIL MODULE-MODULE YANG DIPERLUKAN BUAT BIKIN SERVER
// PANGGIL EXPERESS NYA
const express = require('express')

// BIKIN SERVER
const app = express()

// BUAT RUNNING SERVER NYA
// LALU BIKIN 1 FUNCTION BUAT MENGINDIKASIKAN APAKAH SERVER UDAH JALAN ATAU BELUM
app.listen(process.env.PORT, function () {
    console.log(`Server berjalan di PORT ${process.env.PORT}`)
})