# ⚡ Hızlı Başlangıç Rehberi

## 🎯 5 Dakikada Çalıştırma

### Adım 1: Bağımlılıkları Yükle
```bash
npm install
```
⏱ Süre: ~2 dakika

### Adım 2: Uygulamayı Başlat
```bash
npm start
```
⏱ Süre: ~30 saniye

### Adım 3: Telefonunuzda Aç
1. **Expo Go** uygulamasını indirin
   - 📱 iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - 🤖 Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **QR Kodu Tarayın**
   - Terminal'de görünen QR kodu Expo Go ile tarayın
   - Veya manuel olarak: `exp://192.168.x.x:8081` şeklindeki adresi girin

3. **Uygulama Açılsın!** 🎉

---

## 🔄 İlk Değişikliğinizi Yapın

### 1. Başlık Rengini Değiştirin

**App.js** dosyasını açın ve 114. satırı bulun:

```javascript
// ÖNCESİ (mor)
backgroundColor: '#6200ee',

// SONRASI (mavi)
backgroundColor: '#2196F3',
```

Aynı şekilde 144. satırda da değiştirin:
```javascript
backgroundColor: '#2196F3',  // ve 193. satırda
borderColor: '#2196F3',      // ve 200. satırda
```

**Sonuç:** Uygulamanız otomatik olarak güncellenir ve mavi temaya geçer! 💙

---

## 🎨 Basit Özelleştirmeler

### Başlığı Değiştir
```javascript
// 83. satır
<Text style={styles.headerText}>Günlük Hedeflerim</Text>
```

### Input Placeholder'ı Değiştir
```javascript
// 87. satır
placeholder="Bugün ne yapacaksın?..."
```

### Tamamlanan Todo Görünümü
```javascript
// 213. satırda stili değiştirin
taskTextCompleted: {
  textDecorationLine: 'line-through',
  color: '#999',
  fontStyle: 'italic',  // YENİ: italik yap
},
```

---

## 📱 Örnek Kullanım Senaryoları

### Senaryo 1: Günlük Alışveriş Listesi
```
✓ "Süt al" ekleyin
✓ "Ekmek al" ekleyin  
✓ "Meyve al" ekleyin
✓ İlk öğeye tıklayın (tamamlandı işareti)
✓ İkinci öğeyi silin (× butonuna bas)
```

### Senaryo 2: Haftalık Hedefler
```
✓ "Kitap oku" ekleyin
✓ "Spor yap" ekleyin
✓ "Arkadaşlarla görüş" ekleyin
✓ Tamamladıkça işaretleyin
```

---

## 🐛 Hızlı Sorun Çözme

### Problem: QR Kod Çalışmıyor
**Çözüm:**
```bash
# Terminal'i kapatın (Ctrl+C)
# Tunnel modunda başlatın
npx expo start --tunnel
```

### Problem: "Module not found" Hatası
**Çözüm:**
```bash
# Önbellekleri temizle
npx expo start -c
```

### Problem: Beyaz Ekran
**Çözüm:**
```bash
# Uygulamayı yeniden başlat
npm start
# Telefonda Expo Go'yu kapatıp tekrar aç
```

---

## 🎓 İlk Kod Değişikliğinizi Anlamak

### Bir Todo Eklediğinizde Ne Olur?

```
1. Input'a "Alışveriş yap" yazıyorsunuz
   └─> task state'i güncellenir: task = "Alışveriş yap"

2. + butonuna basıyorsunuz
   └─> addTask() fonksiyonu çalışır
       └─> Yeni obje oluşturur: 
           {
             id: "1696156800000",
             text: "Alışveriş yap",
             completed: false
           }
       └─> tasks dizisine ekler
       └─> Ekran otomatik güncellenir (React magic! ✨)

3. Liste görünür
   └─> FlatList her todo için renderItem çalıştırır
       └─> Her todo için bir kart oluşturur
```

### Bir Todo'yu Tamamladığınızda Ne Olur?

```
1. Todo'ya tıklıyorsunuz
   └─> toggleTask(id) çalışır
       └─> O todo'nun completed değerini tersine çevirir
           (false → true veya true → false)
       └─> tasks state'i güncellenir
       └─> Ekran yeniden render edilir
       └─> Checkbox dolar ve text üstü çizilir ✓
```

---

## 📚 Sonraki Öğrenme Adımları

### Hafta 1: Temelleri Anla
- [ ] State'in ne olduğunu öğren
- [ ] Props'un ne olduğunu öğren
- [ ] Component yapısını anla

### Hafta 2: React Native Bileşenleri
- [ ] View, Text, TouchableOpacity
- [ ] FlatList ve ScrollView
- [ ] TextInput ve Button

### Hafta 3: Stil ve Tasarım
- [ ] Flexbox düzeni
- [ ] Renk ve tema
- [ ] Responsive tasarım

### Hafta 4: İleri Seviye
- [ ] useEffect hook
- [ ] AsyncStorage (veri saklama)
- [ ] API çağrıları

---

## 💪 Pratik Görevler

### Kolay Görevler
1. ✏️ Başlık rengini kırmızı yapın
2. 📝 Placeholder metnini değiştirin
3. 🎨 Arka plan rengini gri yapın
4. 🔤 Yazı boyutunu büyütün

### Orta Seviye Görevler
1. 📊 Tamamlanan todo sayısını gösterin
2. 🗑️ "Tümünü Temizle" butonu ekleyin
3. 🔄 Todo'ları ters sırada gösterin
4. 🎯 Boş liste mesajı ekleyin

### Zor Görevler
1. ✏️ Todo düzenleme özelliği
2. 🗂️ Kategori ekleme
3. 📅 Tarih ve saat ekleme
4. 💾 AsyncStorage ile kaydetme

---

## 🎯 İlk Projenizi Bitirdiniz!

Şimdi ne yapmalısınız?

### Seçenek 1: Daha Fazla Özellik Ekle
- `NASIL_CALISIR.md` dosyasındaki örnekleri deneyin

### Seçenek 2: Yeni Proje Başlat
- Hava durumu uygulaması
- Not defteri uygulaması
- Hesap makinesi

### Seçenek 3: Kodu İncele
- Her satırı okuyun ve anlamaya çalışın
- console.log() ekleyerek test edin
- Bir şeyi bozun, sonra düzeltin (öğrenmenin en iyi yolu!)

---

## 🎉 Tebrikler!

İlk React Native uygulamanızı çalıştırdınız! 

Şimdi:
- ✅ React Native temelleri biliyorsunuz
- ✅ State yönetimini anlıyorsunuz
- ✅ Expo ile nasıl çalışılacağını öğrendiniz
- ✅ Mobil uygulama geliştiricisisiniz! 🚀

**Devam edin, pratik yapın ve eğlenin!** 💻📱

