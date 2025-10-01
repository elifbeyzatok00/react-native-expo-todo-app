# 📱 React Native Expo Todo App

İlk React Native projenize hoş geldiniz! Bu, Expo kullanarak yapılmış basit ama güçlü bir yapılacaklar listesi uygulamasıdır.

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.81.4-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

---

## ✨ Özellikler

- ✅ **Görev Ekleme** - Hızlıca yeni görevler ekleyin
- ✅ **Görev Silme** - Tamamlanan görevleri kaldırın
- ✅ **Tamamlama İşareti** - Görevleri yapıldı olarak işaretleyin
- ✅ **Modern UI** - Temiz ve kullanıcı dostu arayüz
- ✅ **Anlık Güncelleme** - Değişiklikler anında yansır
- ✅ **Cross-Platform** - iOS ve Android'de çalışır

---

## 🚀 Hızlı Başlangıç

### 1️⃣ Kurulum
```bash
npm install
```

### 2️⃣ Çalıştırma
```bash
npm start
```

### 3️⃣ Telefonunuzda Test
1. **Expo Go** uygulamasını indirin ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. QR kodu tarayın
3. Uygulamayı kullanmaya başlayın! 🎉

---

## 📖 Dokümantasyon

Bu projeyi anlamak ve geliştirmek için detaylı rehberler hazırladık:

- 📘 **[NASIL_CALISIR.md](./NASIL_CALISIR.md)** - Kodun detaylı açıklaması, nasıl çalıştığı ve yeni özellik ekleme
- ⚡ **[HIZLI_BASLANGIC.md](./HIZLI_BASLANGIC.md)** - 5 dakikada başlangıç ve ilk değişiklikleriniz

---

## 🎯 Kullanım

### Görev Ekleme
1. Alttaki input kutusuna görevinizi yazın
2. **+** butonuna basın veya klavyede Enter'a basın
3. Görev listeye eklenir!

### Görevi Tamamlama
- Göreve tıklayın
- Checkbox işaretlenir ve metin üstü çizili hale gelir

### Görev Silme
- Görevin yanındaki **×** butonuna basın
- Görev listeden silinir

---

## 🛠 Teknolojiler

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| React Native | 0.81.4 | Native mobil uygulama framework'ü |
| Expo | ~54.0.0 | Geliştirme ve test ortamı |
| React | 19.1.0 | UI kütüphanesi |
| JavaScript | ES6+ | Programlama dili |

---

## 📁 Proje Yapısı

```
react-native-expo-todo-app2/
│
├── App.js                    # 🎯 Ana uygulama dosyası
├── app.json                  # ⚙️ Expo yapılandırması
├── package.json              # 📦 Bağımlılıklar
├── babel.config.js           # 🔧 Babel ayarları
│
├── NASIL_CALISIR.md         # 📘 Detaylı rehber
├── HIZLI_BASLANGIC.md       # ⚡ Hızlı başlangıç
└── README.md                # 📖 Bu dosya
```

---

## 🎨 Özelleştirme

### Tema Rengini Değiştir
`App.js` dosyasında `#6200ee` rengini arayın ve istediğiniz renkle değiştirin:

```javascript
backgroundColor: '#2196F3',  // Mavi
backgroundColor: '#4CAF50',  // Yeşil
backgroundColor: '#FF5722',  // Turuncu
```

### Yazı Boyutunu Ayarla
```javascript
fontSize: 16,  // Normal
fontSize: 18,  // Büyük
fontSize: 14,  // Küçük
```

---

## 🚀 Yayınlama

### Expo ile Yayınla
```bash
npx expo publish
```

### APK Oluştur (Android)
```bash
npx expo build:android
```

### Standalone App
```bash
npx eas build
```

> **Not:** Yayınlama için [Expo hesabı](https://expo.dev/) gereklidir.

---

## 🐛 Sorun Giderme

### QR Kod Çalışmıyor
```bash
npx expo start --tunnel
```

### Modül Bulunamıyor
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Beyaz Ekran
- Uygulamayı kapatıp tekrar açın
- `npm start` ile yeniden başlatın

Daha fazla yardım için: [HIZLI_BASLANGIC.md](./HIZLI_BASLANGIC.md)

---

## 📚 Öğrenme Kaynakları

### Resmi Dokümantasyon
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Docs](https://react.dev/)

### Video Eğitimler
- YouTube: "React Native Tutorial for Beginners"
- YouTube: "Expo Tutorial"

---

## 🎯 Sonraki Adımlar

1. ✏️ Kodu okuyun ve anlamaya çalışın
2. 🎨 Renkleri ve stilleri değiştirin
3. ✨ Yeni özellikler ekleyin
4. 📖 [NASIL_CALISIR.md](./NASIL_CALISIR.md) dosyasını okuyun
5. 🚀 Kendi projenizi geliştirin!

---

## 📝 Lisans

Bu proje eğitim amaçlıdır. Dilediğiniz gibi kullanabilir ve geliştirebilirsiniz.

---

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Yeni özellik ekleyin
3. Pull request gönderin

---

## 📞 İletişim

Sorularınız için:
- GitHub Issues açın
- Expo Forums'da sorun
- Stack Overflow'da arayın

---

<p align="center">
  <strong>İyi kodlamalar! 💻🚀</strong>
</p>

<p align="center">
  <sub>İlk React Native projeniz olarak harika bir başlangıç yaptınız! 🎉</sub>
</p>

