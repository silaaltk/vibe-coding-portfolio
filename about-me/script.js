// Buton tıklama olayı - Hakkımda bölümüne yumuşak kaydırma
document.getElementById('dahaFazlaBtn').addEventListener('click', function() {
    document.getElementById('hakkimda').scrollIntoView({ behavior: 'smooth' });
});

// Form gönderme olayı
document.getElementById('iletisimFormu').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Mesajınız gönderildi! (Bu sadece bir örnek)');
    this.reset();
});

// Sayfa yüklendiğinde konsola mesaj yazdır
console.log('Hakkımda sayfası yüklendi!');