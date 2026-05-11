# Monthly Finance App

A simple monthly finance tracker built with Node.js, Express, and MySQL. This app supports transaction management and dashboard summary views with filtering.

## Fitur Utama

- Tambah, edit, dan hapus transaksi
- Tampilkan ringkasan `income`, `expense`, dan `balance`
- Filter transaksi berdasarkan tanggal dan tipe
- Filter dashboard berdasarkan bulan dan tahun

## Struktur Penting

- `public/dashboard.html` — halaman dashboard
- `public/dashboard.js` — logic filter dashboard
- `public/script.js` — logic transaksi dan filter transaksi
- `src/controllers/dashboardController.js` — controller dashboard
- `src/models/dashboardModel.js` — query summary/dashboard
- `src/controllers/transactionController.js` — controller transaksi
- `src/models/transactionModel.js` — query transaksi

## Cara Menjalankan

1. Install dependencies:

```bash
npm install
```

2. Jalankan server:

```bash
node server.js
```

3. Buka browser ke:

- `http://localhost:3000/dashboard/view` untuk dashboard
- `http://localhost:3000/` untuk daftar transaksi

## Routing Patterns

### Dashboard (Multi-page Pattern)
```javascript
// Routes di-mount ke /dashboard
app.use('/dashboard', dashboardRoutes);

// URL yang tersedia:
GET /dashboard/view     → serve dashboard.html
GET /dashboard/api      → return JSON summary data
GET /dashboard/api/category-summary → return chart data
```

### Transaction (SPA Pattern)
```javascript
// Static files diserve otomatis
app.use(express.static('public'));

// API routes di-mount ke /transactions
app.use('/transactions', transactionRoutes);

// URL yang tersedia:
GET /                    → serve index.html (via static)
GET /transactions        → return JSON transaction data
GET /transactions/:id    → return single transaction
POST /transactions       → create transaction
PUT /transactions/:id    → update transaction
DELETE /transactions/:id → delete transaction
```

## Fitur Filter

### Dashboard Filter

- Form filter di `public/dashboard.html` menggunakan `month` dan `year`
- Saat klik `Apply Filter`, `dashboard.js` mengirim request ke:
  - `GET /dashboard/api/?month=<value>&year=<value>`
- Backend `dashboardController.getDashboardSummary()` menerima query params dan memanggil:
  - `dashboardModel.getDashboardSummary(month, year)`
- Model menghitung `total_income`, `total_expense`, dan `balance` dengan filter bulan/tahun

### Transaction Filter

- Form filter di halaman transaksi menggunakan `startDate`, `endDate`, dan `type`
- Saat submit, `script.js` memanggil:
  - `GET /transactions?startDate=<value>&endDate=<value>&type=<value>`
- Backend `transactionController.getTransactions()` akan:
  - memanggil `Transaction.getFilteredTransactions(...)` jika ada filter
  - atau `Transaction.getAllTransactions()` jika tanpa filter
- Hasilnya dirender ulang ke daftar transaksi

## Catatan

- Pastikan database terhubung dengan benar di `src/config/db.js`
- Pastikan field tanggal di tabel transactions bernama `trans_date` sesuai query

## Troubleshooting

- Jika filter dashboard tidak bekerja, cek apakah backend menerima `month` dan `year`
- Jika transaksi tidak muncul, cek query string pada request dan hasil JSON di console browser


<!--  -->
Kalau bingung app dari mana? 
/ kok bisa /transactions? 

cek aja di file app.js