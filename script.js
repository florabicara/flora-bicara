// Menunggu seluruh konten halaman dimuat sebelum menjalankan script
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Ambil nama tumbuhan dari URL (contoh: ?nama=puspa)
    const params = new URLSearchParams(window.location.search);
    const namaKey = params.get('nama');

    // Jika tidak ada nama di URL, hentikan script
    if (!namaKey) {
        document.getElementById('nama-tumbuhan').textContent = "Tumbuhan tidak ditemukan.";
        return;
    }

    // 2. Ambil data dari file data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data.json');
            }
            return response.json();
        })
        .then(data => {
            // 3. Cari data yang cocok dengan nama dari URL
            const tumbuhan = data[namaKey];

            // 4. Jika data ditemukan, masukkan ke elemen HTML
            if (tumbuhan) {
                document.getElementById('nama-tumbuhan').textContent = tumbuhan.namaUmum;
                document.title = tumbuhan.namaUmum + " - Flora Bicara"; // Ganti judul tab browser
                document.getElementById('gambar-utama').src = tumbuhan.gambar.utama;
                document.getElementById('deskripsi-singkat').textContent = tumbuhan.deskripsiSingkat;
            // Atur status konservasi jika ada
            const statusEl = document.getElementById('conservation-status');
            if (tumbuhan && statusEl) {
                const status = tumbuhan.statusKonservasi || '';
                statusEl.textContent = status;
                statusEl.style.color = '#222';
            }
        } else {
            document.getElementById('nama-tumbuhan').textContent = `Tumbuhan "${namaKey}" tidak ada dalam database.`;
        }
    })
    .catch(error => {
        console.error('Terjadi masalah:', error);
        document.getElementById('nama-tumbuhan').textContent = "Gagal memuat data.";
    });
});
