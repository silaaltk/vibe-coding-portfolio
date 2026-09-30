const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Nodemailer taşıyıcısı (Gmail üzerinden mail göndermek için)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'silaaltunk1@gmail.com',
        pass: process.env.EMAIL_PASS
    }
});

// Ana sayfa rotası
app.get('/', (req, res) => {
    res.send('Merhaba! Bu senin kendi yazdığın ilk backend sunucun!');
});

// İletişim formundan gelecek verileri karşılayacak POST rotası
app.post('/api/iletisim', async (req, res) => {
    const { isim, eposta, mesaj } = req.body;

    const yeniSatir = `İsim: ${isim} | E-posta: ${eposta} | Mesaj: ${mesaj}\n`;

    // 1. Dosyaya kaydediyoruz
    try {
        fs.appendFileSync(path.join(__dirname, 'mesajlar.txt'), yeniSatir, 'utf8');
        console.log('📁 mesajlar.txt dosyasına kaydedildi.');
    } catch (err) {
        console.error('Dosya yazma hatası:', err);
    }

    // 2. E-posta gönderme işlemi
    const mailOptions = {
        from: 'silaaltunk1@gmail.com',
        to: 'silaaltunk1@gmail.com',
        subject: `Portfolyo Sitesinden Yeni Mesaj: ${isim}`,
        text: `Sana web sitendeki iletişim formundan yeni bir mesaj geldi!\n\nGönderen Kişi: ${isim}\nE-posta Adresi: ${eposta}\n\nMesaj:\n${mesaj}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('📧 E-posta başarıyla gönderildi!');
        res.json({ basarili: true, mesaj: 'Mesajınız başarıyla iletildi ve e-posta gönderildi!' });
    } catch (error) {
        console.error('DETAYLI HATA - E-posta gönderilemedi:', error);
        res.json({ basarili: true, mesaj: 'Mesajınız dosyaya kaydedildi!' });
    }
});

// Sunucuyu başlatıyoruz
app.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});
