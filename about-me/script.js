// Buton tıklama olayı - Hakkımda bölümüne yumuşak kaydırma
const dahaFazlaBtn = document.getElementById('dahaFazlaBtn');
if (dahaFazlaBtn) {
    dahaFazlaBtn.addEventListener('click', function() {
        document.getElementById('hakkimda').scrollIntoView({ behavior: 'smooth' });
    });
}

// Form gönderme olayı (Fetch ile kendi yerel sunucumuza gönderme)
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
            // Form verilerini JSON nesnesine dönüştürüyoruz
            const formData = {
                isim: form.querySelector('#isim').value,
                eposta: form.querySelector('#eposta').value,
                mesaj: form.querySelector('#mesaj').value
            };

            const response = await fetch('/api/iletisim', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formDurum.textContent = 'Teşekkürler! Mesajınız kendi sunucunuza başarıyla ulaştı.';
                formDurum.style.color = '#10b981'; // Yeşil renk başarı mesajı
                formDurum.style.display = 'block';
                form.reset(); // Formu temizle
            } else {
                throw new Error('Bir hata oluştu.');
            }
        } catch (error) {
            formDurum.textContent = 'Üzgünüm, sunucuya ulaşılamadı. Sunucunun çalıştığından emin olun.';
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
