# React Native Expo Todo App - Nasıl Çalışır? 📱

## 📚 İçindekiler
1. [Proje Yapısı](#proje-yapısı)
2. [Teknolojiler](#teknolojiler)
3. [Nasıl Çalışır?](#nasıl-çalışır)
4. [Kodun Açıklaması](#kodun-açıklaması)
5. [Geliştirme](#geliştirme)
6. [Yeni Özellik Ekleme](#yeni-özellik-ekleme)

---

## 📁 Proje Yapısı

```
react-native-expo-todo-app2/
│
├── App.js                 # Ana uygulama dosyası (tüm kodlar burada)
├── app.json              # Expo yapılandırma dosyası
├── package.json          # Proje bağımlılıkları ve scriptler
├── babel.config.js       # Babel (JavaScript derleyici) ayarları
├── .gitignore           # Git'in takip etmeyeceği dosyalar
└── README.md            # Proje hakkında genel bilgiler
```

---

## 🛠 Teknolojiler

### React Native
- **Ne yapar?** JavaScript kullanarak iOS ve Android için native mobil uygulamalar yapar
- **Neden kullanıyoruz?** Bir kod yazdığınızda hem iPhone'da hem Android'de çalışır

### Expo
- **Ne yapar?** React Native geliştirmeyi kolaylaştırır
- **Avantajları:**
  - Xcode veya Android Studio kurmadan test edebilirsiniz
  - Telefonunuzda anlık olarak değişiklikleri görebilirsiniz
  - Birçok hazır özellik sunar (kamera, konum, bildirimler vb.)

### React Hooks
- `useState`: Verileri saklar ve değiştirir
- Örnek: Todo listesini `useState` ile saklıyoruz

---

## ⚙️ Nasıl Çalışır?

### 1. Başlatma
```bash
npm start
```
Bu komut:
1. Metro Bundler'ı başlatır (JavaScript kodlarını paketler)
2. Bir QR kod gösterir
3. Telefonda Expo Go ile QR'ı tarayarak uygulamayı açarsınız

### 2. Telefonda Test
- **Expo Go** uygulamasını indirin:
  - iOS: App Store'dan
  - Android: Play Store'dan
- QR kodu tarayın
- Uygulama açılır!

### 3. Canlı Güncelleme (Hot Reload)
- Kod değiştirdiğinizde otomatik olarak telefonda güncellenir
- Kaydettiğiniz anda değişikliği görürsünüz

---

## 💻 Kodun Açıklaması

### App.js - Ana Dosya

#### 1. Import'lar
```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ... } from 'react-native';
```
- `React`: Temel React kütüphanesi
- `useState`: Veri saklamak için hook
- `StyleSheet, Text, View...`: React Native bileşenleri

#### 2. State (Veri) Yönetimi
```javascript
const [task, setTask] = useState('');        // Input'taki metin
const [tasks, setTasks] = useState([]);      // Tüm todo'lar
```

**State nedir?**
- Uygulamanın hafızası
- State değiştiğinde ekran otomatik güncellenir
- `task`: Şu an yazılan todo
- `tasks`: Tüm todo listesi

#### 3. Fonksiyonlar

##### addTask - Yeni Todo Ekleme
```javascript
const addTask = () => {
  if (task.trim().length > 0) {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: task, completed: false },
    ]);
    setTask('');
  }
};
```
**Ne yapar?**
1. Input boş değilse kontrol eder
2. Yeni bir todo objesi oluşturur:
   - `id`: Benzersiz kimlik (şu anki zaman)
   - `text`: Todo metni
   - `completed`: Tamamlandı mı? (false = hayır)
3. Eski todo'lara yeni todo'yu ekler (`...tasks` = spread operator)
4. Input'u temizler

##### deleteTask - Todo Silme
```javascript
const deleteTask = (id) => {
  setTasks(tasks.filter((item) => item.id !== id));
};
```
**Ne yapar?**
- `filter`: Belirtilen id'ye sahip olmayan tüm todo'ları tutar
- Yani o id'li todo hariç hepsini alır = silme işlemi

##### toggleTask - Tamamlandı İşaretleme
```javascript
const toggleTask = (id) => {
  setTasks(
    tasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )
  );
};
```
**Ne yapar?**
1. `map`: Tüm todo'ları dolaşır
2. Eğer id eşleşirse:
   - `completed` değerini tersine çevirir (true → false, false → true)
3. Diğer todo'ları olduğu gibi bırakır

#### 4. UI Bileşenleri

##### TextInput - Metin Girişi
```javascript
<TextInput
  style={styles.input}
  placeholder="Yeni görev ekle..."
  value={task}
  onChangeText={setTask}
  onSubmitEditing={addTask}
/>
```
- `value`: Input'un değeri
- `onChangeText`: Yazı değiştiğinde çalışır
- `onSubmitEditing`: Enter'a basınca çalışır

##### FlatList - Liste Gösterimi
```javascript
<FlatList
  data={tasks}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
/>
```
- `data`: Gösterilecek dizi
- `renderItem`: Her öğe için nasıl görüneceği
- `keyExtractor`: Her öğenin benzersiz anahtarı

#### 5. Stil (Style)
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // ... diğer stiller
});
```
**StyleSheet nedir?**
- CSS'e benzer ama JavaScript objesi
- `flex: 1`: Tüm alanı kapla
- `backgroundColor`: Arka plan rengi
- `padding`, `margin`: Boşluklar

---

## 🔧 Geliştirme

### package.json - Komutlar
```json
"scripts": {
  "start": "expo start",      // Geliştirme modunda başlat
  "android": "expo start --android",  // Android'de aç
  "ios": "expo start --ios",          // iOS'te aç (sadece Mac)
  "web": "expo start --web"           // Web tarayıcıda aç
}
```

### Bağımlılıklar (Dependencies)
```json
"expo": "~54.0.0",              // Expo framework
"expo-status-bar": "~3.0.8",    // Durum çubuğu kontrolü
"react": "19.1.0",              // React kütüphanesi
"react-native": "0.81.4"        // React Native çekirdeği
```

---

## ➕ Yeni Özellik Ekleme

### Örnek 1: Todo Düzenleme Özelliği

#### Adım 1: State Ekle
```javascript
const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState('');
```

#### Adım 2: Düzenleme Fonksiyonu
```javascript
const editTask = (id, newText) => {
  setTasks(
    tasks.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    )
  );
  setEditingId(null);
};
```

#### Adım 3: UI Güncelle
```javascript
{editingId === item.id ? (
  <TextInput
    value={editText}
    onChangeText={setEditText}
    onSubmitEditing={() => editTask(item.id, editText)}
  />
) : (
  <Text>{item.text}</Text>
)}
```

### Örnek 2: Kategori Ekleme

#### Adım 1: Veri Yapısını Değiştir
```javascript
{
  id: '1',
  text: 'Alışveriş yap',
  completed: false,
  category: 'Kişisel'  // YENİ
}
```

#### Adım 2: Kategori Seçici Ekle
```javascript
const [category, setCategory] = useState('Kişisel');

// Kategoriler
const categories = ['Kişisel', 'İş', 'Acil'];
```

### Örnek 3: Yerel Depolama (AsyncStorage)

#### Bağımlılık Ekle
```bash
npx expo install @react-native-async-storage/async-storage
```

#### Import Et
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

#### Kaydetme
```javascript
const saveTasks = async (newTasks) => {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
  } catch (error) {
    console.error('Kaydetme hatası:', error);
  }
};
```

#### Yükleme
```javascript
useEffect(() => {
  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Yükleme hatası:', error);
    }
  };
  loadTasks();
}, []);
```

---

## 🎨 Renk Değiştirme

### Tema Rengini Değiştirme
`App.js` dosyasında `#6200ee` rengini değiştirin:

```javascript
// Mor tema → Mavi tema
backgroundColor: '#2196F3'  // Mor yerine mavi
borderColor: '#2196F3'
```

### Gradient Arka Plan Eklemek
```bash
npx expo install expo-linear-gradient
```

```javascript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#667eea', '#764ba2']}
  style={styles.header}
>
  <Text style={styles.headerText}>Yapılacaklar</Text>
</LinearGradient>
```

---

## 🐛 Hata Ayıklama

### Beyaz Ekran - "Metro Bundler Connection Failed"
**Çözüm:** Terminal'i kapatın ve tekrar `npm start` çalıştırın

### "Unable to resolve module"
**Çözüm:**
```bash
rm -rf node_modules
npm install
```

### Telefonda Bağlantı Hatası
**Çözüm:** 
- Bilgisayar ve telefon aynı Wi-Fi'de olmalı
- Firewall'u kapatın
- Tunnel modunu deneyin: `expo start --tunnel`

---

## 📖 Öğrenme Kaynakları

### Resmi Dokümantasyon
- **React Native:** https://reactnative.dev/docs/getting-started
- **Expo:** https://docs.expo.dev/
- **React:** https://react.dev/

### Türkçe Kaynaklar
- **Prototurk React Native:** YouTube'da aratın
- **Kablosuz Kedi React Native:** YouTube kanalı

### Pratik Projeler
1. **Hava Durumu Uygulaması:** API kullanımı öğrenin
2. **Not Defteri:** Dosya yönetimi öğrenin
3. **Alışveriş Listesi:** Karmaşık state yönetimi

---

## 🚀 Sonraki Adımlar

### 1. Temel Özellikler
- ✅ Todo ekleme
- ✅ Todo silme
- ✅ Todo tamamlama
- ⬜ Todo düzenleme
- ⬜ Yerel depolama

### 2. Gelişmiş Özellikler
- ⬜ Kategoriler
- ⬜ Tarih ekleme
- ⬜ Öncelik seviyesi
- ⬜ Arama özelliği
- ⬜ Filtreleme

### 3. UI İyileştirmeleri
- ⬜ Animasyonlar
- ⬜ Karanlık mod
- ⬜ Özel ikonlar
- ⬜ Gesture (kaydırma) işlemleri

### 4. Backend Entegrasyonu
- ⬜ Firebase bağlantısı
- ⬜ Kullanıcı girişi
- ⬜ Bulut senkronizasyonu

---

## ❓ Sık Sorulan Sorular

### React Native vs Flutter?
- **React Native:** JavaScript, daha büyük topluluk
- **Flutter:** Dart, daha hızlı performans

### Expo vs Pure React Native?
- **Expo:** Hızlı başlangıç, kolay test
- **Pure RN:** Daha fazla kontrol, native modüller

### iOS'ta test edebilir miyim? (Windows)
- Hayır, iOS simulator sadece Mac'te çalışır
- Ama Expo Go ile iPhone'unuzda test edebilirsiniz

---

## 💡 İpuçları

1. **Console.log kullanın:** Hata ayıklamak için
2. **Component'lere ayırın:** Kod karmaşıklaşınca ayrı dosyalara bölün
3. **Git kullanın:** Her önemli değişikliği commit edin
4. **Deneyin:** Kod değiştirip ne olduğunu görün, korkmayın!

---

## 📞 Yardım

Takıldığınız bir yer olursa:
- **Stack Overflow:** Arama yapın, büyük ihtimalle biri sormuştur
- **Expo Forums:** https://forums.expo.dev/
- **React Native Community:** Discord kanalı

---

**Başarılar! 🎉**

Bu projeyi geliştirmeye devam edin ve yeni özellikler ekleyin. 
Programlama yaparak öğrenilir! 💪

