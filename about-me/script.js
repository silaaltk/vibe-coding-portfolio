// Form gönderme olayı (Fetch ile arka planda Formspree'ye gönderme)
const iletisimFormu = document.getElementById('iletisimFormu');
if (iletisimFormu) {
    iletisimFormu.addEventListener('submit', async function(e) {
        e.preventDefault(); // Sayfanın yenilenmesini engelliyoruz

        const form = this;
        const gonderBtn = document.getElementById('gonderBtn');
        const formDurum = document.getElementById('formDurum');

        // Kullanıcıya gönderiliyor mesajı gösterelim ve butonu kapatalım
        gonderBtn.disabled = true;
        gonderBtn.textContent = 'Gönderiliyor...';
        formDurum.style.display = 'none';

        try {
            const response = await fetch('https://formspree.io/f/mdekbbql', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formDurum.textContent = 'Teşekkürler! Mesajınız başarıyla gönderildi.';
                formDurum.style.color = '#10b981'; // Yeşil renk başarı mesajı
                formDurum.style.display = 'block';
                form.reset(); // Formu temizle
            } else {
                throw new Error('Bir hata oluştu.');
            }
        } catch (error) {
            formDurum.textContent = 'Üzgünüm, mesajınız gönderilemedi. Lütfen tekrar deneyin.';
            formDurum.style.color = '#f43f5e'; // Kırmızı renk hata mesajı
            formDurum.style.display = 'block';
        } finally {
            gonderBtn.disabled = false;
            gonderBtn.textContent = 'Gönder';
        }
    });
}

// Sayfa yüklendiğinde konsola mesaj yazdır
console.log('Hakkımda sayfası yüklendi!');
